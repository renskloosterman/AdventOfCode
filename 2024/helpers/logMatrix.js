function logMatrix(matrix) {
    // Find the width of the largest number for consistent spacing
    const colWidth = Math.max(
      ...matrix.flat().map(num => num.toString().length)
    );
  
    // Format and log each row
    matrix.forEach(row => {
      const formattedRow = row
        .map(num => num.toString().padStart(colWidth)) // Pad each number
        .join(" "); // Join numbers with a space
      console.log(formattedRow);
    });
    console.log('')
  }

module.exports = {
    logMatrix
}