const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then((data) => {
    console.log(data);
});

function init() {
    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {

        let names = data.names;

        names.forEach((id) => {
            console.log(id);

            dropdownMenu.append("option").text(id).property("value", id);
        });

        let name = names[0];

        console.log(name);

        meta(name);
        bar(name);
        bubble(name);
    });
};

function meta(sample) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;

        let value = metadata.filter((result) => result.id == sample);

        console.log(value)

        let ct = value[0];

        d3.select("#sample-metadata").html("");

        Object.entries(ct).forEach(([key, value]) => {
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

    });
  };

function bar(sample) {
    d3.json(url).then((data) => {
        let sample_info = data.samples;

        let value = sample_info.filter((result) => result.id == sample);

        let ct = value[0];

        let otu_ids = ct.otu_ids;
        let otu_labels = ct.otu_labels;
        let sample_values = ct.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        let trace = {
            x: sample_values.slice(0,10),
            y: otu_ids.slice(0,10).map(id => `OTU ${id}`),
            text: otu_labels.slice(0,10),
            type: "bar",
            orientation: "h"
        };

        let layout = {
            yaxis: {autorange: "reversed"}
        };

        Plotly.newPlot("bar", [trace], layout)
    });
};

function bubble(sample) {
    d3.json(url).then((data) => {
        let sample_info = data.samples;

        let value = sample_info.filter((result) => result.id == sample);

        let ct = value[0];

        let otu_ids = ct.otu_ids;
        let otu_labels = ct.otu_labels;
        let sample_values = ct.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        let trace_2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            }
        };

        let layout = {
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [trace_2], layout)
    });
};

function optionChanged(value) {
    console.log(value);

    meta(name);
    bar(name);
    bubble(name);
};

init();