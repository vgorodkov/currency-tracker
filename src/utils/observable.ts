class Observable<T> {
  private observers: ((data: T) => void)[] = [];

  subscribe(func: (data: T) => void): void {
    this.observers.push(func);
  }

  unsubscribe(func: (data: T) => void): void {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data: T): void {
    this.observers.forEach((observer) => observer(data));
  }
}

export default new Observable();
