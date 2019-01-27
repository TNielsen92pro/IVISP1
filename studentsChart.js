// Render a new chart
function studentsChart(){
    d3.csv('Bok.csv', function(error, data) {
      if (error) {
          console.error('Error getting or parsing the data.');
          throw error;
      }

    skillArray = ['VisSkills','StatSkills','MathSkills','ArtSkills','CompSkills','CodeSkills','GraphSkills','MDISkills','EvalSkills','CommSkills','CollabSkills','RepoSkills']

    for(var i = 0; i < data.length; i++){
        var maxLevel = 0;
        var totalSkillTemp = 0;
        var bestSkillTemp = "VisSkills";
       
        for(var j = 0; j < 12; j++){
            totalSkillTemp += +data[i][skillArray[j]];
            if(data[i][skillArray[j]] > maxLevel){
                maxLevel = data[i][skillArray[j]];
                bestSkillTemp = skillArray[j];
            }
        }
        data[i].totalSkill = totalSkillTemp;
        data[i].bestSkill = bestSkillTemp;
        data[i].bestSkillValue = data[i][bestSkillTemp];
        maxLevel = 0;
        totalSkill = 0;
    }

    console.log(data);
    var chart = bubbleChart().width(1200).height(1000).title("All students");      
    chart.totalSkill("bestSkillValue").columnForTitle("Name").columnForColors("bestSkill").columnForRadius("totalSkill").unitName("Total skill level:");
    chart.showTitleOnCircle(true);
    // selection.datum() returns the bound datum for the first element in the selection and doesn't join the specified array of data with the selected elements
    d3.select('#chart').datum(data).call(chart);

    /*var table = d3.select('#tableItem').append('table');
    var titles = d3.keys(groupTable);
		  table.append('tr')
		                   .selectAll('th')
                           .data(titles)
                           .enter()
		                   .append('th')
		                   .text(function (d) {
                            return "Group " + groupTable[d].Group;
                        });
    
    
    table.selectAll('tr')
    .data(groupTable[0].members)
    .enter()
    .append('th')
    .text(function (d) {
        return "empty";
    });
*/

});
}