function setup(Backbone) {
    // Setup simple fetch caching
    ["Collection", "Model"].forEach(function (ctor) {
        var oldFetch = Backbone[ctor].prototype.fetch;

        Backbone[ctor].prototype.deferredFetch = null;
        Backbone[ctor].prototype.fetch = function CachingFetch(options) {
            var deferred = this.deferredFetch;

            options = options || {};

            if (deferred && ! options.reload) {
                return deferred;
            }

            this.deferredFetch = deferred = oldFetch.apply(this, arguments);

            return deferred;
        };
    });
}

module.exports = {
    setup: setup
};
