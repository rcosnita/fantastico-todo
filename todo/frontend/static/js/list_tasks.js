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
    TPL_TASK = ['<div class="task">'];
    TPL_TASK.push('<div class="input-group">');
    TPL_TASK.push('<span class="input-group-addon">');
    TPL_TASK.push('<input type="checkbox" data-role="tasks-complete" data-tid="<%= task.get(\"task_id\") %>" />');
    TPL_TASK.push('</span>');
    TPL_TASK.push('<% if(task.get("status") === 0) { %>');
    TPL_TASK.push('<h3 class="form-control"><%= task.get(\"name\") %></h3>');
    TPL_TASK.push('<% } else { %>');
    TPL_TASK.push('<h3 class="form-control task-completed"><%= task.get(\"name\") %></h3>');
    TPL_TASK.push('<% } %>');    
    TPL_TASK.push("</div>");
    TPL_TASK.push("<hr/>");
    TPL_TASK.push("</div>");
    
    TPL_TASK = TPL_TASK.join("");

    function ListingController() {
        this._tasks = new Todo.Models.Tasks.TaskCollection();
        this._offset = 0;
        this._limit = 10;
        this._fetchMoreSize = 5;
    };
    
    ListingController.prototype.start = function() {
        this._tfNewTask = $("#txt-new-task");
        this._btnComplete = $("#btn-complete-task");
        this._btnRemove = $("#btn-remove-task");
        this._tasksArea = $(".tasks-area");
        this._pagerText = $(".tasks-pager").find("p");
        this._btnPagerFetch = $(".tasks-pager").find("button");
        
        this._initEvents();
    };

    ListingController.prototype._getSelectedTasks = function() {
        var ids = [],
            tasksChk = this._tasksArea.find("input[data-role='tasks-complete']");
            
        _.each(tasksChk, function(item) {
            item = $(item);
            
            if(!item.is(":checked")) {
                return;
            }
            
            ids.push(parseInt(item.attr("data-tid")));
        });

        return ids;
    };

    ListingController.prototype._initEvents = function() {
        var self = this;

        this._tfNewTask.keyup(function(evt) {
            if(evt.keyCode == 13) {
                self._createTask(self._tfNewTask.val());
                
                return false;
            }
            
            return true;
        });
        
        this._btnRemove.click(function() {
            var ids = self._getSelectedTasks();
            
            self._deleteTasks(ids);
        });
        
        this._btnComplete.click(function() {
            var ids = self._getSelectedTasks();
            
            self._completeTasks(ids);
        });
        
        this._btnPagerFetch.click(function() {
            self._fetchMoreTasks();
        });
        
        this._tasks.on("reset", function() {
            self._fetchTasks();
        });

        this._pagerText.html("");
        this._tasks.reset();
    };
    
    ListingController.prototype._fetchTasks = function() {
        var response = this._tasks.fetch({"offset": this._offset,
                                          "limit": this._limit}),
            self = this;
        
        response.done(function() {
            self._tasksArea.html("");
            self._tfNewTask.val("");

            self._tasks.each(function(task) {
                self._renderTask(task);
            });
            
            self._showPageText();
        });
    };
    
    ListingController.prototype._renderTask = function(task) {
        var taskUi = _.template(TPL_TASK),
            model = {"task": task},
            taskHtml = taskUi(model);

        this._tasksArea.append(taskHtml);
    };
    
    ListingController.prototype._createTask = function(taskName) {
        var task = new Todo.Models.Tasks.Task({"name": taskName, "status": 0}),
            self = this;
        
        task.save().always(function() {
            self._fetchTasks();
        });
    };
    
    ListingController.prototype._showPageText = function() {
        var totalItems = this._tasks.totalItems,
            displayedItems = Math.min(this._limit, totalItems),
            pagesText = displayedItems + " out of " + totalItems;

        this._pagerText.html(pagesText);
    };
    
    ListingController.prototype._deleteTasks = function(taskIds) {
        this._btnRemove.button("loading");

        taskIds = taskIds || [];
        
        var onGoing = 0,
            self = this;
        
        function deleteWhenAllDone() {
            onGoing--;
        
            if(onGoing > 0) {
                return;
            }
            
            self._btnRemove.button("reset");
        
            self._tasks.reset();
        }
        
        _.each(taskIds, function(taskId) {
            onGoing++;
            
            var response = new Todo.Models.Tasks.Task({"task_id": taskId}).destroy().always(deleteWhenAllDone);
            
            taskIds.push(response);
        });
    };
    
    ListingController.prototype._completeTasks = function(taskIds) {
        this._btnComplete.button("loading");
        
        taskIds = taskIds || [];
        
        var onGoing = 0,
            self = this;
        
        function completeWhenAllDone() {
            onGoing--;
        
            if(onGoing > 0) {
                return;
            }
            
            self._btnComplete.button("reset");
        
            self._tasks.reset();
        }

        
        _.each(taskIds, function(taskId) {
            var task = self._tasks.get(taskId);
            
            task.set({"status": 1});
            
            task.save().always(completeWhenAllDone);
        });
    };
    
    ListingController.prototype._fetchMoreTasks = function() {
        var newLimit = this._limit + this._fetchMoreSize;
        
        newLimit = Math.min(newLimit, this._tasks.totalItems);
        
        if(newLimit >= this._tasks.totalItems) {
            this._btnPagerFetch.hide();
        }
        
        this._limit = newLimit;
        
        this._tasks.reset();
    };

    Todo.Controllers.ListingController = ListingController;
})(jQuery);