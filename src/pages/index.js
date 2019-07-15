import React from "react";

let result;

export default () => (
  <form onSubmit={useSubmitHandler()}>
    {result == null ? (
      <React.Fragment>
        <h1>Quiz: Are you a real 10x programmer?</h1>
        <section>
          <h3>You care about</h3>
          <label>
            <input type="checkbox" name="front-end" value="front-end" />{" "}
            front-end
          </label>
          <br />
          <label>
            <input type="checkbox" name="back-end" value="back-end" /> back-end
          </label>
          <br />
          <label>
            <input type="checkbox" name="API" value="API" /> API
          </label>
          <br />
          <label>
            <input type="checkbox" name="database" value="database" /> database
          </label>
          <br />
          <label>
            <input type="checkbox" name="serverless" value="serverless" />{" "}
            serverless
          </label>
          <br />
          <label>
            <input type="checkbox" name="UI" value="UI" /> UI
          </label>
          <br />
        </section>
        <section>
          <h3>What's your background color?</h3>
          <input type="color" name="bg" />
        </section>
        <section>
          <h3>What time do you start working?</h3>
          <input type="time" name="time" step={60} />
        </section>
        <section>
          <h3>Which keys are more worn out in your keyboard? (pick three)</h3>
          <label>
            <input type="checkbox" name="a" value="a" /> a
          </label>
          <br />
          <label>
            <input type="checkbox" name="i" value="i" /> i
          </label>
          <br />
          <label>
            <input type="checkbox" name="f" value="f" /> f
          </label>
          <br />
          <label>
            <input type="checkbox" name="e" value="e" /> e
          </label>
          <br />
          <label>
            <input type="checkbox" name="x" value="x" /> x
          </label>
          <br />
          <label>
            <input type="checkbox" name="s" value="s" /> s
          </label>
        </section>
        <section>
          <h3>How much do you know about blockchain?</h3>
          Nothing <input type="range" name="blockchain" /> A lot
        </section>
        <br />
        <button type="submit">Rate Me</button>
      </React.Fragment>
    ) : (
      <div>
        <p>
          You are a <strong>{result}x</strong> programmer!{" "}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `I am a ${result}x programmer. How about you? https://areyou10x.netlify.com #10xEngineer`
            )}`}
          >
            Tweet your score
          </a>
        </p>
        <p>
          Real 10x programmers{" "}
          <a href="https://github.com/pomber/areyou10x">send PRs</a> during
          meetings.
        </p>
      </div>
    )}
  </form>
);

const rates = {
  "front-end": input => (input.checked ? 0.04 : -0.04),
  "back-end": input => (input.checked ? 0.04 : -0.04),
  API: input => (input.checked ? 0.04 : -0.04),
  database: input => (input.checked ? 0.04 : -0.04),
  serverless: input => (input.checked ? 0.04 : -0.04),
  UI: input => (input.checked ? -0.2 : 0),
  bg: input => (darkness(input.value) - 0.5) / 2.5,
  time: input => Math.abs(parseHour(input.value) - 8) / (15 * 5),
  a: input => (input.checked ? -0.07 : 0),
  i: input => (input.checked ? 0.06 : 0),
  f: input => (input.checked ? 0.07 : 0),
  e: input => (input.checked ? -0.07 : 0),
  x: input => (input.checked ? 0.07 : 0),
  s: input => (input.checked ? -0.06 : 0),
  blockchain: input => (+input.value - 50) / (50 * 5)
};

function useSubmitHandler() {
  const update = React.useState()[1];
  return event => {
    event.preventDefault();
    const { elements } = event.target;
    let score = 0;
    Object.keys(rates).forEach(key => {
      score += rates[key](elements[key]);
    });
    result = Math.round(100 * Math.pow(10, score)) / 100;
    update(result);
  };
}

function darkness(color) {
  // from https://stackoverflow.com/a/51567564/1325646
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return 1 - brightness / 255;
}

function parseHour(time) {
  const hourString = time == null ? "" : time.split(":")[0];
  const parsedHour = parseInt(hourString, 10);
  return Number.isNaN(parsedHour) ? 8 : parsedHour % 24;
}
