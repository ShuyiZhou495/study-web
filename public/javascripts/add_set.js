
window.οnlοad=function(){
    var sets = document.getElementById('setScript').getAttribute('sets');
    var i;
    for (i = 0; i < sets.length; i++) {
        $("#setContainer").append(createSet(sets[i]));
    }
};

function createSet(set){
    var //var block
    set =[ //array/whitespace format so we can still view/edit in an HTML-ish format
        '<div class="col-md-4">',
          '<div class="card mb-4 shadow-sm">',
            '<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail">',                
            '<title>{{setname}}</title>', //setname
                '<rect width="100%" height="100%" fill="#55595c"/>',
                '<text x="50%" y="50%" fill="#eceeef" dy=".3em">{{author}}</text>', //author
            '</svg>',
            '<div class="card-body">',
              '<p class="card-text">{{description}}</p>', //description
              '<div class="d-flex justify-content-between align-items-center">',
                '<div class="btn-group">',
                  '<button type="button" class="btn btn-sm btn-outline-secondary">View</button>',
                '</div>',
                '<button type="button" class="btn btn-sm">',
					'<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
					  '<path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>',
					'</svg>',
					'<small class="text-muted">9</small>',
                '</button>',
              '</div>',
            '</div>',
          '</div>',
        '</div>',
    ].join(''), //converted to string
    injectedValues = {
        setname = set.setname,
        author = set.author,
        description = set.description
    }
    ;//end var block
    return ( injectValues( injectedValues, set ) );
};
function injectValues(valuesObj, targetString){
    for(var x in valuesObj){
        var globalRegExMatcher = new RegExp('\\{\\{'+ x +'\\}\\}','g');
        targetString = targetString.replace( globalRegExMatcher, valuesObj[x] );
    }
    return targetString;
}
export default createSet;