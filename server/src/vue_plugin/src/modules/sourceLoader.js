export default function () {

    var store = {
        sources: []
    };

    // TODO: make casting async
    
    var castMedia = function (media){

        if(!media.resource) {

            console.log('YOU CASTED MEDIA WITH NO RESOURCE');

        }else if(media.resource.url == 'fetching'){
            
            // TODO: do something better while fetching
            var image = new Image();
            image.src = 'https://i.imgur.com/IaS4CqB.png';
            store.sources.push({media:media, cast:image, type: 'image'});

        }else{

            if(media.resource.type == 'image'){
                var image = new Image();
                image.src = media.resource.url;
                store.sources.push({media:media, cast:image, type:media.resource.type});
            }
    
            if(media.resource.type == 'video'){
                var video = document.createElement("video");
                video.src = media.resource.url;
                store.sources.push({media:media, cast:video, type:media.resource.type});
            }

        }

        
    };

    var decastMedia = function (source) {

        // hey gc get these pls
        // seems to be working nicely
        if(source.type == 'video'){
            source.cast.pause();
            source.cast.src = '';
        }
        if(source.type == 'image'){
            source.cast.src = '';
        }
        delete source.type;
        delete source.cast;

    };

    this.eachSource = function (cb) {

        store.sources.forEach(function(source, index){
            cb(source, index);
        });

    };

    this.loadSelectedResource = function (resource) {

        // deletes and recasts media that has 'resource'

        let i = store.sources.length;

        while (i--) {
            if( store.sources[i].media.resource.name == resource.name ){
                decastMedia(store.sources[i]);
                console.log(resource);
                castMedia(store.sources[i].media);
                store.sources.splice(i, 1);
            }
        }
        
        console.log(store.sources);

    };
    
    this.loadMedia = function (media) {
        castMedia(media);
    };

};