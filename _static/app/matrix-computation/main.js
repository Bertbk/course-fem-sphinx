var fem_matrix_computation = new function() {
    var scale = 1000; // arbitrary, just to get "pleasant" numbers
    var mesh_pts = [[0,0], [140,10], [100,80], [-10,120],[45,50], [150,130]];
    var mesh_triangles= [[0,1,4], [4,1,2], [3, 4, 2], [3,0,4], [3,2,5], [2,1,5]];
  
    var r = 10.0; // radius of vert
    var max_x =0.0, max_y=0.0;
    var min_x =10000.0, min_y=1000.0;
    for (let i = 0; i < mesh_pts.length; i++)
    {
        min_x = Math.min(parseFloat(mesh_pts[i][0]), min_x);
        min_y = Math.min(parseFloat(mesh_pts[i][1]), min_y);
        max_x = Math.max(parseFloat(mesh_pts[i][0]), max_x);
        max_y = Math.max(parseFloat(mesh_pts[i][1]), max_y);
    }
    var size_x = (max_x - min_x) + 3*r;
    var size_y = (max_y - min_y) + 3*r;
  
  
    var div = d3.select('div.app-matrix-computation');
  
    var tooltipstyle = "position: absolute; text-align: center; width: auto;height: auto; overflow:hidden;padding: 4px;font: 0.5rem;background: lightsteelblue;border: 0px;border-radius: 8px;pointer-events: none;";
    var tooltip = d3.select('body').append('div')
            .attr('style', tooltipstyle + ' opacity:0;')
            .attr("class", "tooltip")
    ;
  
    var svg = div.insert('svg', ":first-child")
                    .attr('viewBox', parseFloat(min_x - 1.5*r) + " " + parseFloat(min_y - 1.5*r)+ " " + parseFloat(size_x)  + " " +  parseFloat(size_y))
                    .attr('preserveAspectRatio', "xMidYMid meet")
                    .attr('width', size_x)
                    .attr('height', size_y)
                    .attr('style', 'width:75%; height:auto;')
    ;
    
    div.insert('h2', ':first-child').text('Maillage');
    
    var all_triangles = svg.append('g')
        .attr('class','all_triangles')
        .selectAll('g')
        .data(mesh_triangles)
        .enter()
        .append('polygon')
        .attr('points', function(d){return mesh_pts[d[0]][0] + " " + mesh_pts[d[0]][1] + ", " + mesh_pts[d[1]][0] + " " + mesh_pts[d[1]][1] + ", " + mesh_pts[d[2]][0] + " " + mesh_pts[d[2]][1];})
        .attr('class', 'd3_triangle')
        .attr('data-active', '0')
        .attr('element-number', function(d,i){return i})
        .on('click', function(d,i){
            activate(this, d);
            })
        .on("mouseover", triangleHover)
        .on("mouseout", triangleHoverOut)
        ;
  
    // Build all vertices
    var all_pts = svg.append('g')
        .attr('class','all_pts')
        .selectAll('g')
        .data(mesh_pts)
        .enter()
        .append('g')
        .attr('data-algorithm', 'stop')
        .attr('class', function(d,i){return 'd3_point vertex-' +  i;})
        .on("mouseover", pointHover)
        .on("mouseout", pointHoverOut)
        ;
    // Add the circle
    var all_pts_circle = all_pts.append('circle')
        .attr('cx', function(d){return d[0]})
        .attr('cy', function(d){return d[1]})
        .attr('r', r)
        ;
    // Add the text value of points
    var all_pts_txt = all_pts.append('text')
        .attr('x', function(d){return d[0]})
        .attr('y', function(d){return d[1]})
        .attr('text-anchor', 'middle')
        .attr('dy',  "0.3em")
        .text(function(d,i){return i+1;})
        .attr('font-size', '0.5em')
        .attr('cursor', 'unset')
    ;
  
    //Built the matrices
    var matrix = d3.select("table#fem-matrix")
                .append('tbody')
                .selectAll('tr')
                .data(mesh_pts)
                .enter()
                .append('tr')
                .attr('data-row', function(d,i){return i;})
                .selectAll('td')
                .data(mesh_pts)
                .enter()
                .append('td')
                .attr('data-col', function(d,i){return i;})
                .text(parseFloat(0).toFixed(2))
                .attr('data-highlight', '0')
    ;
    var matrix_elem =   d3.select("table#fem-matrix-elem")
                        .selectAll('tr')
                        .selectAll('td')
                        .text(parseFloat(0).toFixed(2))
    ;

    // FUNCTIONS
    //============
  
    // Hide every points
    function disable_vertices(){
        all_pts_circle.attr('stroke-opacity', '0.5').attr('fill', 'none');
        all_pts_txt.attr('style', 'display:none;');
    };

  
    function activate(t, d){
        var this_triangle = d3.select(t);
        let new_status = (1+parseInt(this_triangle.attr('data-active')))%2;
        if(new_status == 0) {
            // Triangle t becomes inactive
            this_triangle.attr('data-active', '0');
            // Remove elementary contribution
            step_assembling(t,d);
            // If no triangle are activated anymore, reset to normal
            if(svg.selectAll('.d3_triangle[data-active="1"]').size()==0)
            {
                svg.selectAll('.d3_triangle').attr('data-algorithm', 'stop');
            }
        }
        else{
            // Activate this triangle t
            this_triangle.attr('data-active', '1');
            // If this is the only activated triangle, make other transparents
            if(svg.selectAll('.d3_triangle[data-active="1"]').size()==1)
            {
                svg.selectAll('.d3_triangle').attr('data-algorithm', 'start');
            }
            // Add contribution
            step_assembling(t,d);
        }
    };
  
    // d = data attached to polygon (=triangle)
    function step_assembling(t,d){
        // Add or Remove coefficients ?
        var sign = (d3.select(t).attr('data-active'));
        var jac=  compute_jacobian(d,scale);
        for (let i = 0; i < d.length; i++){
            var I = d[i];
            for (let j = 0; j < d.length; j++){
                var J = d[j];
                var coef = (jac*mass_ref(i,j)).toFixed(2);
                var matij = parseFloat(d3.selectAll("tr[data-row='"+I+"']").selectAll("td[data-col='"+J+"']").text());
                var new_coef = 0;
                if(sign == "1") //Add
                { new_coef = (matij + parseFloat(coef)).toFixed(2);}
                else // Substract
                {new_coef = (matij - parseFloat(coef)).toFixed(2);}
                d3.select('table#fem-matrix').selectAll("tr[data-row='"+I+"']").selectAll("td[data-col='"+J+"']").text(new_coef);
            }
        }

    }

    function mass_elem(d){
        var jac = 0;
        if(d.length != 0){
            jac=  compute_jacobian(d,scale);
        }
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                var coef = (jac*mass_ref(i,j)).toFixed(2);
                d3.select("table#fem-matrix-elem").selectAll("tr[data-row='"+i+"']").selectAll("td[data-col='"+j+"']").text(coef);
            }
        }
    }

    //Reference mass matrix
    function mass_ref(i,j){
        return (i==j)?1/12:1/24;
    }

    // d = data attached to polygon
    function compute_jacobian(d, scale){
        return Math.round((((mesh_pts[d[1]][0] - mesh_pts[d[0]][0]) * (mesh_pts[d[2]][1] - mesh_pts[d[0]][1])
                -(mesh_pts[d[2]][0] - mesh_pts[d[0]][0]) * (mesh_pts[d[1]][1] - mesh_pts[d[0]][1]))/scale)*100)/100  
            ;
    };

    function triangleHover(d,i){
        for (let i = 0; i < d.length; i++){
            var I = d[i];
            for (let j = 0; j < d.length; j++){
                var J = d[j];
                d3.selectAll("tr[data-row='"+I+"']").selectAll("td[data-col='"+J+"']").attr('data-highlight', '1');
            }
        }
        mass_elem(d);
    }

    function triangleHoverOut(d,i){
        for (let i = 0; i < d.length; i++){
            var I = d[i];
            for (let j = 0; j < d.length; j++){
                var J = d[j];
                d3.selectAll("tr[data-row='"+I+"']").selectAll("td[data-col='"+J+"']").attr('data-highlight', '0');
            }
        }
        mass_elem([]);
    }

    function pointHover(d,i){
        let indexing = d3.select(this).attr('data-algorithm');
        if(indexing == "local")
        {
            let x = d3.event.pageX + 20;
            tooltip.transition()
            .duration(200)
            .attr('style', tooltipstyle + " opacity :.9; left :" + x + "px; top: "+d3.event.pageY + "px;")
            ;
            tooltip.html("Numéro Global <br/>" + i)
            ;
        }
    };
  
    function pointHoverOut(d,i){
        tooltip.transition()
        .duration(500)
        .attr('style', tooltipstyle + " opacity :0;");
    };
  };