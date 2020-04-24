
function get_line_deph(line) {
    if (line.length <= 0)
        return 0;
        
    let count = 0;
    for (let index = 0; index < line.length; index++) {
        if (line[index] === '.') {
            count++;
        }
    }
    return count;
}

let families_array = [];
let index_family = 0;
let family_array = [];

let current_deph = 0;

let start = false;

const count = parseInt(readline());
for (let i = 0; i < count; i++) {
    const line = readline();

    let line_deph = get_line_deph(line);
    
    if (!line_deph) {
        if (!start) {
            start = true;
        } else {
            families_array[index_family] = family_array;
            family_array = [];
            current_deph = 0;
            index_family++;
        }
        
        families_array[index_family] = [];
    } else if (line_deph) {
        if (line_deph < current_deph) {
            families_array[index_family++] = family_array;
            family_array = family_array.slice(0, line_deph);
        } else if (line_deph === current_deph) {
            families_array[index_family++] = family_array;
            family_array = family_array.slice(0, current_deph);
        }
        
        current_deph = line_deph;
    }
    
    family_array.push(line);
    
    if (i === (count - 1)) {
        families_array[index_family] = family_array;
    }
}

for (let index = 0; index < families_array.length; index++) {
    console.log(families_array[index].join(" > ").replace(/[.]/g, ''));
}
