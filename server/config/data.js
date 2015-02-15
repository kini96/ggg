app.factory('dataBooks', function($resource) {

    var resource = $resource('/data_books/:id', { id: '@id' });

    return {
        getArtist: function(id) {
            return resource.get({id: id});
        },
        saveArtist: function(artist) {
            window.alert("Saving is disabled for security reasons. Thank you for using Music Artists and have fun! :)")
            // if (!artist.id) {
            //     resource.query().$promise.then(function(data) {
            //         artist.id = data.length + 1;
            //         resource.save(artist);
            //     });
            // }
            // else {
            //     resource.save(artist);
            // }
        },
        getAllArtists: function() {
            return resource.query();
        }
    }
})