// Minimal test harness for Node (no browser APIs)
let total = 0, passed = 0, failed = 0;
let currentSuite = '';
const failures = [];

export function describe(name, fn) {
  currentSuite = name;
  fn();
}

export function it(name, fn) {
  total++;
  try {
    fn();
    passed++;
    process.stdout.write(`  \x1b[32m✓\x1b[0m ${name}\n`);
  } catch (e) {
    failed++;
    const msg = `  \x1b[31m✗\x1b[0m ${name}\n    ${e.message}`;
    process.stdout.write(msg + '\n');
    failures.push({ suite: currentSuite, test: name, error: e.message });
  }
}

export function assert(cond, msg = 'assertion failed') {
  if (!cond) throw new Error(msg);
}

export function assertEqual(a, b, msg) {
  if (a !== b) throw new Error(msg || `expected ${b}, got ${a}`);
}

export function assertClose(a, b, eps = 0.01, msg) {
  if (Math.abs(a - b) > eps) throw new Error(msg || `expected ~${b}, got ${a}`);
}

export function assertThrows(fn, msg = 'expected throw') {
  try { fn(); throw new Error(msg); } catch (e) {
    if (e.message === msg) throw e;
  }
}

export function summary() {
  console.log(`\n\x1b[1m${passed}/${total} passed\x1b[0m`);
  if (failed > 0) {
    console.log(`\x1b[31m${failed} failed:\x1b[0m`);
    for (const f of failures) {
      console.log(`  ${f.suite} > ${f.test}: ${f.error}`);
    }
  }
  return { total, passed, failed, failures };
}
