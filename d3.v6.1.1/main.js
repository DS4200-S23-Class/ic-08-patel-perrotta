// Setting up constant variables 
const FRAME_HEIGHT = 550;
const FRAME_WIDTH = 600;
const MARGINS = {left: 50, right: 50,
				top: 50, bottom: 50};

// Constants for scaling the visualizations 
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// Creating a frame for first vis in column 1
const FRAME1 = d3.select("#flex_left")
					.append("svg")
						.attr("height", FRAME_HEIGHT)
						.attr("width", FRAME_WIDTH)
						.attr("class", "frame");


                        function build_barchart() {
                            // read data from second file
                            d3.csv("data/data.csv").then((data) => {
                        
                                console.log(data);
                        
                                const MAX_Y2 = d3.max(data, (d) => {return parseInt(d.Value); });
                        
                                const X_SCALE2 = d3.scaleBand()
                                                    .domain(data.map((d) => {return d.Category}))
                                                    .range([0, VIS_WIDTH]);
                        
                                const Y_SCALE2 = d3.scaleLinear()
                                                    .range([VIS_HEIGHT, 0])
                                                    .domain([0, MAX_Y2])
                        
                                // plot
                                FRAME1.selectAll(".bar")
                                                .data(data)
                                                .enter().append("rect")
                                                            .attr("class", "bar")
                                                            .attr("x", d => {
                                                                    return X_SCALE2(d.Category) + MARGINS.left
                                                                })
                                                            .attr("y", d => {
                                                                return (Y_SCALE2(d.Value) + MARGINS.bottom)
                                                            })
                                                            .attr("width", X_SCALE2.bandwidth() - 5)
                                                            .attr("height", d => {
                                                                return (VIS_HEIGHT - Y_SCALE2(d.Value))
                                                            })
                        
                                // add x-axis
                                // create x-axis
                                FRAME1.append("g")
                                          .attr("transform", "translate(" + 
                                              MARGINS.left+ "," + (MARGINS.top + VIS_HEIGHT) + ")")
                                              .call(d3.axisBottom(X_SCALE2).ticks(10));
                        
                                // create y-axis
                                FRAME1.append("g")
                                          .attr("transform", "translate(" + 
                                              MARGINS.left + "," + (MARGINS.top) + ")")
                                          .call(d3.axisLeft(Y_SCALE2).ticks(10));
                        
                                // create a tooltip
                                const TOOLTIP = d3.select("#flex_left")
                                                    .append("div")
                                                        .attr("class", "tooltip")
                                                        .style("opacity", 0);
 					
                        
                            });
                        }
                        
                        build_barchart();