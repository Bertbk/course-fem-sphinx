var fem_loc2glob = new function() {
    var mesh_pts = [[0,0], [140,10], [100,80], [-10,120],[45,50], [150,130]];
    var mesh_triangles= [[0,1,4], [4,1,2], [3, 4, 2], [3,0,4], [2,3,5], [1,2,5]];

    var triangle_color = {
        "inactive": "none", 
        "active": "GhostWhite"
    };
    var point_color = {
        "global": "GhostWhite",
        "local" : "darkblue"
    };
    var txt_color = {
        "global": "black",
        "local" : "white"
    };

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

    var div = d3.select('div.app-local-to-global')
                .attr('style', 'text-align:center')
    ;

    var tooltipstyle = "position: absolute; text-align: center; width: auto;height: auto; overflow:hidden;padding: 4px;font: 0.5rem;background: lightsteelblue;border: 0px;border-radius: 8px;pointer-events: none;";
    var tooltip = d3.select('body').append('div')
            .attr('style', tooltipstyle + ' opacity:0;')
            .attr("class", "tooltip")
    ;

    var title=div.insert('p', ":first-child")
                .text('Numérotation Globale')
                .attr('style', 'margin:auto; font-size:1.5em;font-weight:bold;color:darkblue;');

    var svg = div.insert('svg', ":first-child")
                    .attr('viewBox', parseFloat(min_x - 1.5*r) + " " + parseFloat(min_y - 1.5*r)+ " " + parseFloat(size_x)  + " " +  parseFloat(size_y))
                    .attr('preserveAspectRatio', "xMidYMid meet")
                    .attr('width', size_x)
                    .attr('height', size_y)
                    .attr('style', 'width:75%; height:auto;')
                    ;
                    

    var all_triangles = svg.append('g')
        .attr('class','all_triangles')
        .selectAll('g')
        .data(mesh_triangles)
        .enter()
        .append('polygon')
        .attr('points', function(d){return mesh_pts[d[0]][0] + " " + mesh_pts[d[0]][1] + ", " + mesh_pts[d[1]][0] + " " + mesh_pts[d[1]][1] + ", " + mesh_pts[d[2]][0] + " " + mesh_pts[d[2]][1];})
        .attr('class', 'd3_triangle')
        .attr('active', '0')
        .attr('element-number', function(d,i){return i})
        .attr('fill', 'none')
        .attr('pointer-events', 'fill')
        .attr('stroke', 'black')
        .attr('style', 'cursor:pointer;')
        .on('click', function(d,i){
            activate(this, d);
            })
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        ;

    // Build all vertices
    var all_pts = svg.append('g')
        .attr('class','all_pts')
        .selectAll('g')
        .data(mesh_pts)
        .enter()
        .append('g')
        .attr('indexing', 'global')
        .attr('class', function(d,i){return 'd3_point vertex-' +  i;})
        .on("mouseover", pointHover)
        .on("mouseout", pointHoverOut)
        ;
    // Add the circle
    var all_pts_circle = all_pts.append('circle')
        .attr('cx', function(d){return d[0]})
        .attr('cy', function(d){return d[1]})
        .attr('r', r)
        .attr('fill', point_color.global)
        .attr('stroke', 'black')
        ;
    // Add the text value of points
    var all_pts_txt = all_pts.append('text')
        .attr('x', function(d){return d[0]})
        .attr('y', function(d){return d[1]})
        .attr('text-anchor', 'middle')
        .attr('dy',  "0.3em")
        .text(function(d,i){return i;})
        .attr('font-size', '0.5em')
        .attr('fill', txt_color.global)
        .attr('cursor', 'unset')
        ;

    // FUNCTIONS
    //============

    // Hide every points
    function disable_vertices(){
        all_pts_circle.attr('stroke-opacity', '0.1').attr('fill', 'none');
        all_pts_txt.attr('style', 'display:none;');
    };

    // Recompute the GLOBAL vertices indices of the current triangle (d = data attached to polygon)
    function global_numbering(){
        all_pts.attr('indexing', 'global');
        all_pts_txt.attr('style', 'display:true;')
                    .text(function(d,i){return i;})
                    .attr('fill', txt_color.global)
                    ;
        all_pts_circle.attr('stroke-opacity', '1').attr('fill', point_color.global);
        title.text('Numérotation Globale');
    };

    // compute the local vertices indices of the current triangle (d = data attached to polygon)
    function local_numbering(d){
        for (let i = 0; i < d.length; i++){
            d3.selectAll('.vertex-'+ d[i]).attr('indexing', 'local');
            d3.selectAll('.vertex-'+ d[i])
                    .selectAll('text')
                    .attr('style', 'display:true;')
                    .text(i)
                    .attr('fill', txt_color.local)
                ;
            d3.selectAll('.vertex-'+ d[i]).selectAll('circle')
                                        .attr('style', 'display:true;')
                                        .attr('stroke-opacity', '1')
                                        .attr('fill', point_color.local)
            ;
        }
        title.text('Numérotation Locale');
    };


    function activate(t, d){
        let new_status = (1+parseInt(d3.select(t).attr('active')))%2;
        if(new_status == 0) {
            // Triangle t becomes inactive and every triangle is visible
            svg.selectAll('.d3_triangle')
                .attr('active', '0')
                .attr('fill', triangle_color.inactive)
                .attr('stroke-opacity', '1')
            ;
            global_numbering();
        }
        else{
            //Disable the (eventually) other triangle
            svg.selectAll('.d3_triangle[active="1"]').attr('active', "0");
            svg.selectAll('.d3_triangle[active="0"]')
                        .attr('fill', triangle_color.inactive)
                        .attr('stroke-opacity', '0.1')                    
            ;
            global_numbering();
            //Activate this triangle t
            d3.select(t).attr('active', '1')
                        .attr('fill', triangle_color.active)
                        .attr('stroke-opacity', '1')
            ;
            disable_vertices();
            local_numbering(d);
        }
    };

    function handleMouseOver(d,i){
        let active = parseInt(d3.select(this).attr('active'));
        if( active == 0)
        {
            d3.select(this).attr('fill', triangle_color.active);
        }
    };

    function handleMouseOut(d,i){
        let active = parseInt(d3.select(this).attr('active'));
        if( active == 0)
        {
            d3.select(this).attr('fill', triangle_color.inactive);
        }
    };

    function pointHover(d,i){
        let indexing = d3.select(this).attr('indexing');
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