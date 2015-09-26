import marked from 'marked';

export class Parser {
  constructor(contents) {
    this.tokens = marked.lexer(contents);
    console.log(this.tokens);
  }

  parse() {
    this.contents = {
      title: this.parseTitle(),
      steps: this.parseSteps(),
    }

    return this;
  }

  parseSteps() {
    const steps = [];

    this.tokens.forEach((token) => {
      if (token.type === 'heading' && token.depth === 2) {
        steps.push({
          name: token.text,
          notes: [],
          changes: []
        });
      }

      // bullet points or paragraphs
      if (token.type === 'text' && steps.length > 0) {
        steps[steps.length - 1].notes.push(token.text);
      }

      // changes are a level 3 heading
      if (token.type === 'heading' && token.depth === 3) {
        steps[steps.length - 1].changes.push({
          file: token.text.split(':')[1].trim(),
        });
      }

      // TODO: this is a naive check and won't spot weirdness
      // we need to keep track of if we're actually in a code block or not
      if (token.type === 'code' && steps[steps.length - 1].changes.length > 0) {
        const lastStep = steps[steps.length - 1];
        const lastChange = lastStep.changes[lastStep.changes.length - 1];
        lastChange.code = token.text;
        lastChange.codeType = token.lang;
      }
    });

    return steps;
  }

  parseTitle() {
    const topLevelHeading = this.tokens.find((token) => {
      return token.type === 'heading' && token.depth === 1;
    });

    return topLevelHeading && topLevelHeading.text;
  }
}

export default function(contents) {
  const parser = new Parser(contents);
  return parser.parse().contents;
};
