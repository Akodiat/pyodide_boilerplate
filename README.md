
# Pyodide boilerplate
![Example result using data.csv](example.png)

Simple boilerplate / demo for using pyodide and vega-lite plotting (and a simple GUI).

This is all a static website and you can try it out now at [akodiat.github.io/pyodide_boilerplate](akodiat.github.io/pyodide_boilerplate).

The app takes a csv file with two columns as input, sums the column values for each row (using numpy), then plots the sums as a bar plot. You may use the `data.csv` file in the repository as input.


To run it locally, you need to start a http static server in this directory. You can easily do that with the following Python command ([or any of these other options](https://gist.github.com/willurd/5720255))

```sh
python -m http.server 8000
```

Then, go to [localhost:8000](localhost:8000) (or whatever port you used above) to view the app.