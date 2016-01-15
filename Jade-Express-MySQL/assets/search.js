(function() {
    var searchTextNode = document.getElementById("search-text");
    var searchDisplay = document.getElementById("search-display");

    function updateHash(x) {
        window.location.hash = encodeURIComponent(x);
    }

    function updateView(searchTerm) {
        if (!searchTerm) {
            searchDisplay.innerHTML = "";
        } else {
            searchDisplay.innerHTML = "You searched for: " + searchTerm;
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        var searchText = searchTextNode.value;
        updateHash(searchText);
        updateView(searchText);
        rudimentaryFilter(searchText);
    }

    function rudimentaryFilter(text) {
        var posts = document.querySelectorAll(".list-group-item");

        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            var postContent = post.children[1];

            var filterPassed = postContent.innerHTML.toLowerCase().indexOf(text.toLowerCase()) > -1;

            post.style.display = filterPassed ? "block" : "none";
        }
    }

    function firstLoad() {
        var hashVal = decodeURIComponent(window.location.hash ? window.location.hash.substring(1) : "");
        searchTextNode.value = hashVal;
        updateView(hashVal);
        rudimentaryFilter(hashVal);

        document.getElementById("search-form").addEventListener("submit", onSubmit);
    }
    firstLoad();
})();
