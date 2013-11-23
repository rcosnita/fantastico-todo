/**
Copyright 2013 Cosnita Radu Viorel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($) {
    var registry = {},
        endpoint = "/roa/resources";

    /**
     * This model holds the object attributes of a resource. Currently it supports only fetch through collection.
     */
    registry.Resource = Backbone.Model.extend({});

    /**
     * This collection provides access to ROA resources registered to the current project. It is recommended to code each model
     * against the registry so that location changes are not breaking client side code.
     */
    registry.ResourceCollection = Backbone.Collection.extend({
        model: registry.Resource,
        url: endpoint,
        /**
         * This method returns the resource url for a given resource name and version. If the version is omitted latest resource
         * url is returned.
         * 
         * @param {String} name The name of the resource we want to retrieve discovery information about.
         * @param {String} version (Optional) The version of the resource we want to retrieve discovery information about.
         * @returns The resource url extracted from ROA discovery registry (/roa/resources).
         */
        getResourceUrl: function(name, version) {
            version = version || "latest";
            
            if(this.length == 0) {
                throw new Error("No ROA resources registered.");
            }
            
            var resources = this.at(0),
                resource = (resources.get(name) || {})[version];

            if(!resource) {
                throw new Error("Resource " + name + ", version " + version + " is not registered.");
            }

            return resource;
        }
    });

    Todo.Models.Registry = new registry.ResourceCollection();
    Todo.Models.Registry.fetch();
})(jQuery);