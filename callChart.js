// Render a new chart
function callChart(skillSet){
    d3.csv('Bok.csv', function(error, data) {
      if (error) {
          console.error('Error getting or parsing the data.');
          throw error;
      }
    var groups = [
        {
            nr: "Group nr 1",
            members: [],
            totalSkill: 0
        },
        {
            nr: "Group nr 2",
            members: [],
            totalSkill: 0
        },
        {
            nr: "Group nr 3",
            members: [],
            totalSkill: 0
        },
        {
            nr: "Group nr 4",
            members: [],
            totalSkill: 0
        },
        {
            nr: "Group nr 5",
            members: [],
            totalSkill: 0
        },
        {
            nr: "Group nr 6",
            members: [],
            totalSkill: 0
        },
        {
            nr: "Group nr 7",
            members: [],
            totalSkill: 0
        },
        {
            nr: "Group nr 8",
            members: [],
            totalSkill: 0
        },
        {
            nr: "Group nr 9",
            members: [],
            totalSkill: 0
        },
        {
            nr: "Group nr 10",
            members: [],
            totalSkill: 0
        }
    ]
    
    let skill = skillSet;
    let leastSkilledGroup = 0;
    data.sort(function(a, b){return a[skill]-b[skill]});
    for(let i = 0; i < 57; i++){
        if(data[i].Name[data[i].Name.length-1] === " "){
            data[i].Name = data[i].Name.slice(0, data[i].Name.length-1);
        }
        data[i].Name = " " + data[i].Name;
        for(let j = 0; j < 10; j++){
            if(groups[j].totalSkill < groups[leastSkilledGroup].totalSkill){
                leastSkilledGroup = j;
            }
        }
        groups[leastSkilledGroup].members.push(data[i].Name);
        groups[leastSkilledGroup].totalSkill += +data[i][skill];
    }
    

    var chart = bubbleChart().width(1200).height(600).title("Group based on " + skill);      
    chart.columnForTitle("members").columnForColors("nr").columnForRadius("totalSkill").unitName("Total " + skill + ":");
    // selection.datum() returns the bound datum for the first element in the selection and doesn't join the specified array of data with the selected elements
    d3.select('#chart').datum(groups).call(chart);
    });
}