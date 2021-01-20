var fem_jacobian = new function() {
    var scale = 10000;
    var tol = 0.005;
    var mesh_pts = [
        { 'x': 0, 'y':100}, 
        { 'x': 0, 'y':0}, 
        { 'x': 100, 'y':100}
    ];

    mesh_triangles = [[0,1,2]];

    var point_color = "darkblue";
    var txt_color = "white";

    var r = 7.0; // radius of vert
    var max_x =150.0, max_y=120.0;
    var min_x =-50.0, min_y=-20.0;
    var size_x = (max_x - min_x) + 3*r;
    var size_y = (max_y - min_y) + 3*r;

    var jac =compute_jacobian(scale) ;

    var div = d3.select('div.app-jacobian')
                .attr('style', 'text-align:center')
                ;

    var divtitle = div.insert('div', ":first-child")
                .attr('style', 'text-align:center;')
    ;
    var title=divtitle.insert('p', ":first-child")
    ;

    var resetbutton=divtitle.insert('button')
                .text('Reset')
                .attr('class', 'btn-lg btn-outline-primary')
                .on('click', function(){resetjac();})
    ;

    var svg = div.insert('svg', ":first-child")
                    .attr('viewBox', parseFloat(min_x - 1.5*r) + " " + parseFloat(min_y - 1.5*r)+ " " + parseFloat(size_x)  + " " +  parseFloat(size_y))
                    .attr('preserveAspectRatio', "xMidYMid meet")
                    .attr('style', 'max-width:500px; border:solid 1px;')
                    ;

    //Build triangle and vertices (and title)
    update_triangle(mesh_pts, jac);
    var canva_vertices = svg.append('g')
                        .attr('class','vertices');
    update_vertices(mesh_pts, jac);
    update_title(jac);
    // Decorate vertices
    var vertices_circle = canva_vertices.selectAll('g')
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', r)
        .attr('fill', point_color)
        .attr('stroke', 'black')
        ;
    // Add the text value of points
    var vertices_txt = canva_vertices.selectAll('g')
        .append('text')
        .attr('x', '0')
        .attr('y', '0')
        .attr('text-anchor', 'middle')
        .attr('dy',  "0.3em")
        .text(function(d,i){return i;})
        .attr('font-size', '0.5em')
        .attr('fill', txt_color)
        ;

    // FUNCTIONS
    //============

    function update_triangle(data, jac) {
        // DATA JOIN
        // Join new data with old elements, if any.
        var triangle = svg.selectAll('polygon')
        .data([data]);

        // ENTER
        // Create new elements as needed.
        triangle.enter().append("polygon")
                .attr('class', 'd3_triangle')
                .attr('fill', 'GhostWhite')
                .attr('stroke', 'black')
                // UPDATE
                // After merging the entered elements with the update selection,
                // apply operations to both.
                .merge(triangle)
                .attr("points",function(d) { 
                    return d.map(function(d) {
                        return [d.x, d.y].join(",");
                    }).join(" ");
                });    
        // EXIT
        // Remove old elements as needed.
        triangle.exit().remove();

        triangle.attr('fill', jac >= tol?'GhostWhite':(jac < -tol?'#ffbd33':'none'))
        ;
    };

    function update_vertices(data, jac) {
        // DATA JOIN
        // Join new data with old elements, if any.
        var vertices = canva_vertices.selectAll('g')
                                    .data(mesh_pts)
        ;
        // ENTER
        // Create new elements as needed.
        vertices.enter().append('g')
                .attr('class', function(d,i){return 'd3-vertex vertex-' +  i;})
                .attr('style', 'cursor:pointer;')
                // UPDATE
                // After merging the entered elements with the update selection,
                // apply operations to both.
                        .merge(vertices)
                .attr('transform', function(d){return 'translate(' + d.x+ ' '+ d.y +')'})
        ;
        // EXIT
        // Remove old elements as needed.
        vertices.exit().remove();

    };

    function update_title(jac){
        let subtitle = "";
        if(jac >= -tol && jac <= tol)
            {subtitle = " (Triangle plat (dégénéré))";}
        else if (jac < -tol)
            {subtitle = " (Triangle retourné)";}

        title.text('Jacobien = ' + jac + subtitle)
            .attr('style', "font-size:1.5em;font-weight:bold;color:"+ (jac > tol?'darkblue;':(jac < -tol?'#ffbd33;':'red;')))
    };

    var drag_handler = d3.drag()
        .on("end", function(d){
        })
        .on("drag", function(d,i) {
            var tol = 0.005;
            mesh_pts[i].x=d3.event.x;
            mesh_pts[i].y=d3.event.y;
            let jac = compute_jacobian(scale);
            update_triangle(mesh_pts, jac);
            update_vertices(mesh_pts, jac);
            update_title(jac);
        })
    ;
    //apply the drag_handler to our circles 
    drag_handler(canva_vertices.selectAll('g'));


    function resetjac(){
    mesh_pts = [
            { 'x': 0, 'y':100}, 
            { 'x': 0, 'y':0}, 
            { 'x': 100, 'y':100}
        ];
        let jac = compute_jacobian(scale);
        update_triangle(mesh_pts, jac);
        update_vertices(mesh_pts, jac);
        update_title(jac);
    };

    function compute_jacobian(scale){
        return Math.round((((mesh_pts[1].x - mesh_pts[0].x) * (mesh_pts[2].y - mesh_pts[0].y)
                -(mesh_pts[2].x - mesh_pts[0].x) * (mesh_pts[1].y - mesh_pts[0].y))/scale)*100)/100  
            ;
    };
};