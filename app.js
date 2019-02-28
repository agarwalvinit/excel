var globalData = {};
(function() {
    let previousVal = null;
    const excel = document.getElementById('excel');
    const rows = document.getElementById("rows");
    const columns = document.getElementById("columns");
    globalData.init = function() {
        while (excel.firstChild) {
            excel.removeChild(excel.firstChild);
        }
        rowLength = rows && parseInt(rows.value) || 0;
        colLength = columns && parseInt(columns.value) || 0;
        excel.addEventListener('click', globalData.editTheTable);
        for (let i = 0; i < rowLength; i++) {
            const row = excel.insertRow(i);
            row.id = `row_${i}`
            addColoumForRow(row);
        }
    }
    function addColoumForRow(row) {
        for(let j = 0; j < colLength; j++) {
            const col = row.insertCell(j);
            col.id = `${row.id}_col_${j}`;
            col.contentEditable = false;
        }
    }
    globalData.editTheTable = function(e) {
        e.preventDefault();
        const val = e.target;
        if (val.tagName !== 'TD') {
            return false;
        }
        if (previousVal) {
            previousVal.contentEditable = false;
            previousVal.style.outline = 'none';
        }
        val.contentEditable = true;
        val.focus();
        val.style.outline = '1px solid #42b6f4';
        previousVal = val;
    }

    globalData.addRow = function() {
        const row = excel.insertRow(rowLength);
        row.id = `row_${rowLength}`;
        addColoumForRow(row);
        rowLength++;      
        rows.value = rowLength;  
    }

    globalData.addColumn = function() {
        for(let i = 0; i < rowLength; i++) {
            const row = document.getElementById(`row_${i}`);
            const col = row.insertCell(colLength);
            col.id = `${row.id}_col_${colLength}`;
            col.contentEditable = false;
        }
        colLength++;     
        columns.value = colLength;
    }

    globalData.removeRow = function() {
        rowLength--;
        excel.deleteRow(rowLength);
        rows.value = rowLength;
    }

    globalData.removeColumn = function() {
        colLength--;
        for(let i = 0; i < rowLength; i++) {
            const row = document.getElementById(`row_${i}`);
            row.deleteCell(colLength);
        }
        columns.value = colLength;
    }

    globalData.init();
})();