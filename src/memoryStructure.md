###### Edited by : siri
###### Date : 15-11-2025
###### Edited Details : details about momory and what exactly stored in which memory

## JavaScript Memory Allocation - in my program too, it has two memory
```
1. Stack (call stack)
2. Heap (Memory Heap)
```
### what is call stack what does it do?
```
fast, fixed-size, ordered memory area
What is stored?

 =================== STACK ====================
 a        → 10
 str      → "hello"
 user     → 0xAA11
 greet    → 0xCC33

 ===============================================
    varible names -> value / address
    primitive Values - stores value directly (numbers, strings, booleans)
    non-primitive Values - stores reference(address to heap) (objects, arrays, functions)
```
### what is heap memory what does it do?
```
A large, free-form, dynamically allocated memory area
 ==================== HEAP ====================
0xAA11 → { name: "Siri", age:20 }
0xCC33 → function greet(){ ... }
 ===============================================
```