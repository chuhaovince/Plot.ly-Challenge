// Create the url to the samples.json file
const jsonurl = "../assets/json/samples.json";


// Define a function that fetch the info for a specific individual
function individual(idNum = 940){
    d3.json(jsonurl).then(function(data) {
        var filteredsample = data.samples.filter(item => item.id == idNum);
        var filterMetadata = data.metadata.filter(item => item.id == idNum);
        console.log(filteredsample);
        var trace = {
            x : filteredsample[0].sample_values.slice(0,10).reverse(),
            y : filteredsample[0].otu_ids.slice(0,10).reverse().map(num => `OTU ${num.toString()}`),
            text : filteredsample[0].otu_labels.slice(0,10).reverse(),
            type : "bar",
            orientation : "h",
        };
        layout = {
            title : `Top 10 OTUs for id ${filteredsample[0].id}`
        }
        var plotdata = [trace];
        Plotly.newPlot("bar",plotdata,layout);

        // Demographic Info
        // clear the previous info first
        d3.select("#sample-metadata").html("");
        for (i = 0; i < Object.keys(filterMetadata[0]).length; i++) {
            if (Object.values(filterMetadata[0])[i] == null) {
                filterMetadata[0][i] = "Unknown";
            } else {
                d3.select("#sample-metadata").append("p").html(`${Object.keys(filterMetadata[0])[i]} : ${Object.values(filterMetadata[0])[i]}`);
            };
        };
    });
    };

// loop through all the ids and right them into the index.html
d3.json(jsonurl).then(function(data) {
    for (i=0; i<data.names.length; i++) {
        d3.select("#selDataset").append("option").attr("value",data.names[i]).html(data.names[i]);
        console.log(d3.select("option").attr("value"));
    };
});


d3.selectAll("#selDataset").on("change", optionChanged());


function optionChanged(id) {
    individual(id);
};



