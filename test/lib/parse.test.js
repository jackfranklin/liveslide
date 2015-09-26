import test from 'tape';
import fs from 'fs';
import parse, { Parser } from '../../lib/parse';

test('Parsing the heading', (t) => {
  t.plan(1);
  const contents = `
  # ES6 and jspm
  `;

  t.deepEqual(new Parser(contents).parseTitle(), 'ES6 and jspm');
});

test('With a single step with no code changes', (t) => {
  t.plan(1);

  const contents = `
  # ES6 and jspm

  ## Setup

  - load up jspm registry in tab
  - run server on port 3000
  - check the wifi
  `;

  t.deepEqual(new Parser(contents).parse().contents, {
    title: 'ES6 and jspm',
    steps: [
      {
        name: 'Setup',
        notes: [
          'load up jspm registry in tab',
          'run server on port 3000',
          'check the wifi',
        ],
        changes: [],
      },
    ],
  });
});

test('With two steps', (t) => {
  t.plan(1);

  const contents = `
  # ES6 and jspm

  ## Setup

  - load up jspm registry in tab
  - run server on port 3000
  - check the wifi

  ## First code

  - write some code
  `;

  t.deepEqual(new Parser(contents).parse().contents, {
    title: 'ES6 and jspm',
    steps: [
      {
        name: 'Setup',
        notes: [
          'load up jspm registry in tab',
          'run server on port 3000',
          'check the wifi',
        ],
        changes: [],
      },
      {
        name: 'First code',
        notes: [
          'write some code',
        ],
        changes: [],
      },
    ],
  });
});

test.only('With a step that has a code change', (t) => {
  t.plan(1);

  const contents = fs.readFileSync('test/fixtures/basic-code.md', { encoding: 'utf8' });

  t.deepEqual(new Parser(contents).parse().contents, {
    title: 'ES6 with jspm',
    steps: [
      {
        name: 'Getting Started',
        notes: [
          'use `jspm` Vim snippet to type this for you!',
        ],
        changes: [{
          file: 'index.html',
          code: '<body>\n</body>',
          codeType: 'html',
        }],
      },
    ],
  });
});

test.skip('Parser can take some Markdown', (t) => {
  t.plan(1);
  const contents = fs.readFileSync('test/fixtures/slides.md', { encoding: 'utf8' });
  const result = parse(contents);
  t.deepEqual(result, {
    title: 'ES6 with jspm',
    steps: [
      {
        name: 'Setup',
        notes: [
          'load up jspm registry in tab',
          'run server on port 3000',
          'check the wifi',
        ],
        changes: [],
      },
      {
        name: 'Getting Started',
        notes: [
          'Don\'t forget to talk about each of the scripts and how we import them',
          'use `jspm` Vim snippet to type this for you!',
        ],
        changes: [
          {
            file: 'index.html',
            code: `
              <!DOCTYPE html>
              <html>
                <head>
                  <title>Open Sauce</title>
                  <script src="jspm_packages/system.js"></script>
                  <script src="config.js"></script>
                  <script>
                    System.import('app/main');
                  </script>
                </head>
                <body>
                </body>
              </html>
            `,
            codeType: 'html',
          }
        ],
      },
    ],
  });
});
