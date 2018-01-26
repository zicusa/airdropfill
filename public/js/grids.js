$(function () {
    
        var controls = [
            { Name: "", Id: 0 },
            { Name: "Textbox", Id: 1 },
            { Name: "Checkbox", Id: 2 },
            { Name: "Submit button", Id: 3 }
        ];
    
        $("#jsGrid").jsGrid({
            height: "70%",
            width: "100%",
            filtering: true,
            inserting: true,
            editing: true,
            sorting: true,
            paging: false,
            autoload: true,
            pageSize: 8,
            pageButtonCount: 5,
            deleteConfirm: "Do you really want to delete client?",
            controller: {
                loadData: function (filter) {
                    return $.ajax({
                        type: "GET",
                        url: "/grids",
                        data: filter
                    });
                },
                insertItem: function (item) {
                    return $.ajax({
                        type: "POST",
                        url: "/grids",
                        data: item
                    });
                },
                updateItem: function (item) {
                    return $.ajax({
                        type: "PUT",
                        url: "/grids",
                        data: item
                    });
                },
                deleteItem: function (item) {
                    return $.ajax({
                        type: "DELETE",
                        url: "/grids",
                        data: item
                    });
                }
            },
            fields: [
                { name: "IDControls", 
                    type: "text", 
                    width: 150
                },
                { name: "Controls", 
                    type: "select", 
                    items: controls, 
                    valueField: "Id", 
                    textField: "Name", 
                    width: 100
                },
                { 
                    type: "control"                
                }
            ]
        });  
        
        
        $('#jsGetGrid').on('click', function() {
            var dataGrid = $("#jsGrid").jsGrid("option", "data");//replace(/[|[\]\\]/g,'')
            var dataExcel = {};
            //var arData;
            var OUT = document.getElementById('out'); 
            dataExcel = OUT.innerText;
            
            var datax = {};           
            datax.Controls = dataGrid;   
            //arData=JSON.stringify(datax);
            
            var site={}; 
            var link = document.getElementById('site');
            site = link.value;
          
            var json1 = datax;
            var json2 = eval("(" + dataExcel + ")");
           
            var json = $.extend(false,{},json1,json2, {site});
            //console.log(json);
            
            axios.post('/fillData', {data:json})
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        });

        $('#jsSaveGrid').on('click', function() {   
            var dataGrid = $("#jsGrid").jsGrid("option", "data");          
            var datax = {};           
            datax.Controls = dataGrid;   
                       
            //var json1 = datax;                      
            axios.post('/savegrids', datax)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });             
        });

        $('#getFile').on('click', function() {
                              
            return $.ajax({
                type: "GET",
                url: "/getFile"              
            });
        });
       
    });
    


    