// This is the snap.svg script way of controlling the files.
var s = Snap("#lmdfb_map");
var svg_desc = "svg_description" // CSS selector for description div box
var svg_examples = "svg_examples";
var svg_element_currently_clicked = 0;
var svg_element_currently_clicked_ID = "";

// JSON object list for editing the SVG descriptions easily
// opaque_id is the id of the element that gets its opacity turned down
// No more than three list items!
var svg = {
    "json":[
        {"name": "Automorphic",
            "id":"#path4148, #tspan3183, #tspan3181",
            "opaque_id":"#path4148",
            "description":"<br>Representations of G(<b>A</b><sub>F</sub>) in the space of automorphic forms, where G is a linear, reductive group defined over a global field F.",
            "list": "Automorphic representations generated by classical modular forms such as:, elliptic or Maass,Hilbert or Bianchi,Siegel",
            "list_link": "#first, #second, #third",
            "url": "#"},
        {"name": "Cohomology",
            "id":"#tspan37006",
            "opaque_id":"#tspan37006",
            "description":"Gal(<o>F</o>/F) acts on the &eacute;tale  &#8467;-adic realizations of motives.",
            "list": "Tate module,",
            "list_link": "",
            "url": "#"},
        {"name": "Convolution",
            "id":"#textPath10975",
            "opaque_id":"#textPath10975",
            "description":"<br>Manipulations of the Satake parameters of the L-function at good places",
            "list": "symmetric powers, exterior powers, Rankin-Selberg convolution",
            "list_link": "",
            "url": "#"},
        {"name": "Converse Theorems",
            "id":"#tspan37244",
            "opaque_id":"#tspan37244",
            "description":"<br>A converse theorem is an assertion that an L-function is the L-function of an automorphic object.",
            "list": "Weil's converse theorem,",
            "list_link": "",
            "url": "#"},
        {"name": "Deformation",
            "id":"#textPath5407",
            "opaque_id":"#textPath5407",
            "description":"<br>Embedding Galois representations into certain universal families",
            "list": "Gouv&ecirc;a-Mazur infinite fern, Taylor-Wiles patching",
            "list_link": "",
            "url": "#"},
        {"name": "Galois Representations",
            "id":"#rect36171, #tspan36212, #tspan36216",
            "opaque_id":"#rect36171",
            "description":"Continuous representations of absolute Galois groups",
            "list": "Artin representations, &#8467;-adic Galois representations, mod &#8467; Galois representations",
            "list_link": "#first, #second, #third",
            "url": "#"},
        {"name": "Hasse-Weil L-functions",
            "id":"#tspan4334",
            "opaque_id":"#tspan4334",
            "description":"The Hasse-Weil L-function of a motive coming from a variety is constructed via counting points on that variety modulo primes.",
            "list": "",
            "list_link": "",
            "url": "#"},
        {"name": "Integral Representations",
            "id":"#tspan36454",
            "opaque_id":"#tspan36454",
            "description":"<br>Representing an L-function as an integral against an automorphic kernel.",
            "list": "integral representations, constant terms of Eisenstein series, Langlands-Shahidi method",
            "list_link": "",
            "url": "#"},
        {"name": "L-Functions",
            "id":"#rect4676, #tspan37328",
            "opaque_id":"#rect4676",
            "description":"An L-function is a Dirichlet series with an Euler product and a functional equation",
            "list": "Riemann zeta function, Dirichlet L-functions, L-functions of elliptic curves",
            "list_link": "#first, #second, #third",
            "url": "#"},
        {"name": "Motivic",
            "id":"#path4674",
            "opaque_id":"#path4674",
            "description":"<br>Motives are summands in the cohomology of varieties. They form the category of representations of the absolute motivic Galois group.",
            "list": "Artin motives, H<sup>1</sup> of curves, hypergeometric motives",
            "list_link": "#first, #second, #third",
            "url": "#"},
        {"name": "Modularity",
            "id":"#tspan36967",
            "opaque_id":"#text36965",
            "description":"<br>Every Galois representation is expected to give rise to an automorphic form via its Frobenius classes.",
            "list": "class field theory, modularity of elliptic curves, Serre's conjecture",
            "list_link": "",
            "url": "#"},
        {"name": "Perfectoid Spaces",
            "id":"#tspan36924",
            "opaque_id":"#tspan36924",
            "description":"Indirect construction of Galois representations via  &#8467;-adic congruences with previously known representations",
            "list": "Deligne-Serre construction, <i>p</i>-adic interpolation, perfectoid spaces",
            "list_link": "",
            "url": "#"},
        {"name": "Schur functors",
            "id":"#textPath4145",
            "opaque_id":"#textPath4145",
            "description":"Linear algebra operations on group representations",
            "list": "Tate twists, adjoint representation, spinor lifts",
            "list_link": "",
            "url": "#"},
        {"name": "Shimura Varieties",
            "id":"#tspan17133",
            "opaque_id":"#textPath17141",
            "description":"Both Hecke operators and Galois groups act on the cohomology of Shimura varieties, giving an unusually direct connection between the automorphic and motivic worlds.",
            "list": "",
            "list_link": "",
            "url": "http://www.lmfdb.org/knowledge/show/mf.elliptic.shimura_correspondence"},
        {"name": "Transfer",
            "id":"#textPath3211",
            "opaque_id":"#textPath3211",
            "description":"Given two groups G and H, Langlands functoriality predicts a lifting from G(<b>A</b>) to H(<b>A</b>) associated to any morphism of L-groups <sup>L</sup>G&#8594;<sup>L</sup>H.",
            "list": "",
            "list_link": "",
            "url": "#"},
        {"name": "Tannakian formalism",
            "id":"#textPath5714, #tspan3770",
            "opaque_id":"#textPath5714, #tspan3770",
            "description":"<br>Linear algebra operations on representations of the motivic Galois group",
            "list": "symmetric powers, exterior powers, direct sums",
            "list_link": "",
            "url": "#"}// Tannakian textPath3777, Formalism textPath5714

    ]
}

// This loads the SVG file and loops through the json objects to
// create all of the interactive SVG elements.
var tux = Snap.load("lmfdbmap.svg", function ( loadedFragment ) {
    s.append( loadedFragment );

    var JSON_entries, IDList = "";
    for( i = 0; i < svg.json.length; i++){

        //This allows you to have multiple elements that trigger the description text
        JSON_entries = svg.json[i].id.split(",");
        //This catalogs the list of all clickable elements
        IDList += svg.json[i].id + ", ";

        for(var j = 0; j < JSON_entries.length; j++) {
            s.select(JSON_entries[j]).mouseover( svg_element_mouse_in(
                svg.json[i].opaque_id, svg.json[i].description, svg.json[i].list, svg.json[i].list_link
            ) );
            s.select(JSON_entries[j]).mouseout( svg_element_mouse_out(
                svg.json[i].opaque_id
            ) );
            s.select(JSON_entries[j]).click( svg_element_mouse_click(
                svg.json[i].opaque_id, svg.json[i].description, svg.json[i].list, svg.json[i].list_link, svg.json[i].url
            ) );
            s.select(JSON_entries[j]).dblclick( svg_element_mouse_dblclick(
                svg.json[i].url
            ) );
        }
    }
    //Gets rid of the extra ", " at the end.
    IDList = IDList.substring(0,IDList.length - 2);


    // This jQuery function clears the infoboxes and selection when not clicking
    // a mathematical object in the SVG.
    $(document).ready(function(){

        $(document).click(function(event) {
            if(!$(event.target).is(IDList)) {
                svg_element_currently_clicked = 0;
                if(svg_element_currently_clicked_ID != ""){
                    //Changes the opacity of group of svg objects
                    change_opacity(svg_element_currently_clicked_ID, 1.0, true);
                    svg_element_currently_clicked_ID = "";
                }
                fillNewInformation( "", "", "");
            }
        });
    });


} );



// This function fills the description and examples boxes with information.
var fillNewInformation = function ( description_text, description_list, description_list_link) {
    //Fills description DIV
    document.getElementById( svg_desc ).innerHTML = "<p></p>";
    document.getElementById( svg_desc ).innerHTML += "<p>" + description_text + "</p>";

    //Fills related objects list/DIV
    split_list = description_list.split(",");
    split_list_links = description_list_link.split(",");
    var list_html = document.getElementById( svg_examples );

    if(split_list.length > 1){  //If more than one item, i.e. a single space.
        list_html.innerHTML = "<p>Examples</p>";

        var temp_string = "";
        for(i = 0; i < split_list.length; i++){
          temp_string = temp_string + "<a href=\"" + split_list_links[i] + "\">\n" + "<li>" + split_list[i] + "</li>\n" + "</a>\n";
        };
        list_html.innerHTML += "<ul>" + temp_string + "</ul>"

    } else {
        list_html.innerHTML = " ";
    }
};


// This function changes the opacity for a group of elements
 var change_opacity = function ( elements, opacity, bypass_if_statement = false ){

     var opaque_elements = elements.split(",");
     for(i = 0; i < opaque_elements.length; i++){
         if( svg_element_currently_clicked_ID != elements || bypass_if_statement){
             s.select( opaque_elements[i] ).attr({"fill-opacity": opacity});
         }
     }
 };


// Function for what happens when the mouse goes over an object.
var svg_element_mouse_in = function ( svg_element_id, description_text, description_list, description_list_link ) {
    return function() {

      //Changes the opacity of group of svg objects
      change_opacity(svg_element_id, 0.5)

      //If a button has not been clicked fill info
      if( !svg_element_currently_clicked ){
        fillNewInformation( description_text, description_list, description_list_link);
      }

    };
};

// Function for what happens when the mouse stops being over an object.
var svg_element_mouse_out = function ( svg_element_id ) {
    return function() {

      //Changes the opacity of group of svg objects.
      change_opacity(svg_element_id, 1.0)

      //If a button has not been clicked clear info
      if( !svg_element_currently_clicked ){
        fillNewInformation( "", "", "");
      }
    };
};

// Function for what happens when you click an object.
var svg_element_mouse_click = function (  svg_element_id, description_text, description_list, description_list_link, url  ) {
    return function() {

        //console.log( svg_element_id );

        if( !svg_element_currently_clicked ){

            svg_element_currently_clicked = 1;
            svg_element_currently_clicked_ID = svg_element_id;

            //Changes the opacity of group of svg objects.
            change_opacity(svg_element_id, 0.5)

            fillNewInformation( description_text, description_list, description_list_link);

        } else if( svg_element_currently_clicked
        && svg_element_currently_clicked_ID == svg_element_id) {

            svg_element_currently_clicked = 0;

            //Changes the opacity of group of svg objects.
            change_opacity(svg_element_id, 1.0)

            svg_element_currently_clicked_ID = "";
            fillNewInformation( "", "", "");

        } else if( svg_element_currently_clicked
        && svg_element_currently_clicked_ID != svg_element_id) {

            //Reset old clicked element
            change_opacity(svg_element_currently_clicked_ID, 1.0, true);

            //Set the new element as current and update the old information
            svg_element_currently_clicked_ID = svg_element_id;
            change_opacity(svg_element_id, 0.5, true);
            fillNewInformation( description_text, description_list, description_list_link);
        }
    };
};

// Function for what happens when you click an object.
var svg_element_mouse_dblclick = function ( url ) {
    return function() {
        //Goes to URL on click
        //window.location.href = url;
    };
};
