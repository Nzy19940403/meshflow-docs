---
aside: false
---
# MeshFlow: Topological Sudoku Matrix
> Stop Backtracking, Start Collapsing.

Welcome to the **MeshFlow Sudoku Engine**. This is not your traditional Depth-First Search (DFS) algorithm. Instead, it is a living, reactive system where 81 individual nodes (cells) continuously negotiate, entangle, and collapse their probabilistic states until a global consensus is reached.

<br/>

### 🌀 Core Mechanics

* **Constraint Collapse**: Values are not explicitly "calculated." As nodes emit `forbidden` signals to their neighbors, the probability cloud of each cell shrinks. When only one possibility remains, the wave function collapses into a physical value.
* **Topological Forensics**: Algorithms fail, but they rarely tell you *why*. When the engine hits a logical deadlock, it triggers a visual forensic scene:
    * 🚨 **Victim Nodes (Red Pulse)**: Singularities where logical space has been crushed to zero.
    * 🕵️ **Suspect Nodes (Orange Glow)**: Neighbors that aggressively occupied the victim's topological space.
* **Limited Self-Healing**: A centralized "Judge" node monitors the matrix. Upon detecting a deadlock, the Judge intervenes by forcing suspect nodes to retract and logging their failures (Banned List).
    > **Note**: As the engine does not store a global snapshot for full backtracking, this self-healing is probabilistic and limited. When contradictions are deep-seated within an irreversible path, the Judge will declare a terminal deadlock.

### 🕹️ Interaction Guide

1.  **Observe Evolution**: Watch as candidate numbers dynamically shrink and values crystallize across the grid.
2.  **⚡ Re-Collapse**: Wipe all deduced values while preserving the initial puzzle. Witness the system's **Strong Eventual Consistency**—regardless of the random path taken, it always converges back to the same lowest-entropy state.
3.  **↻ Zero-State Deduction**: Obliterate the current universe and return to a blank slate. Observe how the engine builds order from absolute chaos through local constraints alone.

<script setup>
import SudokuComponent from '../../components/sudoku.vue'
</script>

 
<ClientOnly>
    <SudokuComponent name="en"></SudokuComponent>
</ClientOnly>