// PreToolUse hook (official token-cost pattern, node instead of jq so it runs
// on Windows Git Bash without extra installs): when the Bash command is a
// plain test-runner invocation, rewrite it to surface only failures. Full
// output stays available by chaining anything past the bare runner (e.g.
// `npm test 2>&1 | cat`): chained commands pass through untouched.
//
// This project (SvelteKit 2 + Vitest via npm): filter only the noisy runners.
// `node tools/gate.mjs` stays unfiltered — its output is already terse and
// "GATE RED:" would not survive the FAIL/ERROR grep below.
const TEST_RUNNERS = /^(npm test|npx? vitest)/;
const SELF_CHECK = "npm test"; // must match TEST_RUNNERS; --check asserts it

// Security guard: never rewrite (and thereby auto-approve) a command that
// chains beyond the test run. `npm test && git push --force` must hit the
// normal permission flow, not this hook's "allow".
const CHAINED = /[;&|<>`$(){}\n]/;

// Self-check: `node filter-test-output.mjs --check`
if (process.argv[2] === "--check") {
  const { strict: assert } = await import("node:assert");
  assert.ok(TEST_RUNNERS.test(SELF_CHECK), "SELF_CHECK must match TEST_RUNNERS");
  assert.ok(!TEST_RUNNERS.test("git status"));
  assert.ok(CHAINED.test("npm test && git push --force"), "chained commands must be guarded");
  assert.ok(CHAINED.test("npm test; rm -rf /"));
  assert.ok(CHAINED.test("npm test > out.txt"));
  assert.ok(!CHAINED.test("npm test --run"));
  console.log("filter-test-output: self-check OK");
  process.exit(0);
}

let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  let out = {};
  try {
    const input = JSON.parse(raw);
    const cmd = input?.tool_input?.command ?? "";
    if (TEST_RUNNERS.test(cmd) && !CHAINED.test(cmd)) {
      out = {
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "allow",
          updatedInput: {
            command: `${cmd} 2>&1 | grep -A 5 -E '(FAIL|ERROR|error:)' | head -100`,
          },
        },
      };
    }
  } catch {
    // Malformed input: pass through untouched rather than block the tool call.
  }
  process.stdout.write(JSON.stringify(out));
});
