export class Either<L, R> {
  private constructor(
    private left: L | null,
    private right: R | null,
  ) {}

  static left<L, R>(value: L): Either<L, R> {
    return new Either(value, null);
  }

  static right<L, R>(value: R): Either<L, R> {
    return new Either(null, value);
  }

  isLeft(): boolean {
    return this.left !== null;
  }

  isRight(): boolean {
    return this.right !== null;
  }

  getLeft(): L | null {
    return this.left;
  }

  getRight(): R | null {
    return this.right;
  }
}
