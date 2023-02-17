# Infinite scrolling in React

## Solution options:

### 1. Updating data remotely involves sending a request for data every time the scroll reaches the end of a block located on the "main" branch.

### 2. Updating data locally involves fetching all of the data at once, but only displaying a portion of it. The list grows without making additional requests, and this approach is implemented on the "localUpdate" branch.