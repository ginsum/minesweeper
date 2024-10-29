export interface SizeType {
  rows: number;
  cols: number;
}

export interface MineSizeType extends SizeType {
  mines: number;
}
export interface IndexType {
  rowIndex: number;
  colIndex: number;
}

export interface RevealType extends IndexType {
  board: number[][];
}
