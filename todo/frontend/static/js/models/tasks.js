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
    var tasks = {};
    
    function getTasksUrl() {
        return Todo.Models.Registry.getResourceUrl("Task");
    }
    
    tasks.Task = Backbone.Model.extend({
        idAttribute: "task_id",
        urlRoot: getTasksUrl
    });
    
    tasks.TaskCollection = Backbone.Collection.extend({
        model: tasks.Task,
        /**
         * This method is overriden so that it guarantees tasks are ordered alphabetically and only id and name attributes are
         * returned for each available task (partial resource representation).
         */
        url: function() {
            var url = [getTasksUrl()];
            url.push("?");
            
            if(this._offset) {
                url.push("offset=" + this._offset);
            }
            
            if(this._limit) {
                url.push("&limit=" + this._limit);
            }
            
            url.push("&fields=task_id,name,status");
            url.push("&order=asc(name)");
            
            return url.join("");
        },
        /**
         * In comparison with standard backbone collection fetch, ROA collections support pagination. This is why options is 
         * parsed before actually fetching the collection. 
         */
        fetch: function(options) {
            options = options || {};

            this._offset = options.offset;
            this._limit = options.limit;

            return Backbone.Collection.prototype.fetch.call(this, options);
        },
        /**
         * This method save the items returned form REST ROA api to this backbone collection. Additionally it adds the total 
         * items counter as collection property.
         * 
         * @param {Object} response The http response coming for /api/latest/tasks collection.
         */
        parse: function(response) {
            this.totalItems = response.totalItems;

            return response.items;
        }
    });

    Todo.Models.Tasks = tasks;
})(jQuery);