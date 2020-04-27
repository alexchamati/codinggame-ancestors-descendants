
class FamilyMember {
    
    constructor (name: string, parent: FamilyMember|null = null) {
        this.name = name;
        this.parent = parent;
    }
    
    name: string;
    parent: FamilyMember;
    children: FamilyMember[] = [];
}

class Family {
    
    constructor (name) {
        this.head = new FamilyMember(name);
    }
    
    private generateString(currentMember: FamilyMember = this.head, line: string = "", lines: string[] = []) {
        
        line += currentMember.name;
        
        if (!currentMember.children.length) {
            lines.push(line);
        }
        
        for (let targetChild of currentMember.children) {
            this.generateString(targetChild, line + " > ", lines);
        }
        
        return lines;
    }
    
    renderString() {
        return this.generateString().join('\n');
    }
    
    addMember(name: string, depth: number) {
        
        let parent = this.head;
        
        for (let index = 1; index < depth; index++) {
            parent = parent.children[parent.children.length - 1];
        }
        
        const member = new FamilyMember(name, parent);
        parent.children.push(member);
    }
    
    head: FamilyMember;
}

function getNameNDeph(line: string) {
    const depth = line.lastIndexOf('.') + 1;
    const name = line.substr(depth);
    
    return { depth, name };
}

let families: Family[] = [];
let lastFamily: Family;
const count: number = parseInt(readline());
for (let i = 0; i < count; i++) {
    const line: string = readline();
    
    const { name, depth } = getNameNDeph(line);
    
    if (depth === 0) {
        lastFamily = new Family(name);
        families.push(lastFamily);
    } else {
        lastFamily.addMember(name, depth);
        
    }
}

for (let family of families) {
    console.log(family.renderString());
}