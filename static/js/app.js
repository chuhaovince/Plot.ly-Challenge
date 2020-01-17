// Create the url to the samples.json file
const jsonurl = "../assets/json/samples.json";

// Define a function that fetch the info for a specific individual
function individual(id){
    
    d3.json(jsonurl).then(function(data) {
        var trace = {
            x : data.samples[0].sample_values.slice(0,10).reverse(),
            y : data.samples[0].otu_ids.slice(0,10).reverse().map(num => `OTU ${num.toString()}`),
            text : data.samples[0].otu_labels.slice(0,10).reverse(),
            type : "bar",
            orientation : "h",
        };
        layout = {
            title : `Top 10 OTUs for id ${data.metadata[0].id}`
        }
        var plotdata = [trace];
        Plotly.newPlot("bar",plotdata,layout);

        // Demographic Info
        for (i = 0; i < Object.keys(data.metadata[0]).length; i++) {
            if (Object.values(data.metadata[0])[i] == null) {
                data.metadata[0][i] = "Unknown";
            } else {
                d3.select("#sample-metadata").append("p").html(`${Object.keys(data.metadata[0])[i]} : ${Object.values(data.metadata[0])[i]}`);
            };
        };
    //d3.select("#sample-metadata").append("p").html(`id : ${data.metadata[0].id}`);
    //console.log(Object.keys(data.metadata[0]).length)
    });
    };

// loop through all the ids and right them into the index.html
function IDs() {
    d3.json(jsonurl).then(function(data) {
    for (i=0; i<data.names.length; i++) {
        d3.select("#selDataset").append("option").attr("value",data.names[i]).html(data.names[i]);
        console.log(d3.select("option").attr("value"));
    };
});
};

function updateIndividual() {
    var dropdownMenuValue = d3.select("#selDataset").value;
};

IDs();
individual();

function optionChanged(option) {
    var value = option.value;
}
// d3.selectAll("#selDataset").on("change", console.log(d3.select("#selDataset").property("value")));




