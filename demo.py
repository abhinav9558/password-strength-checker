#!/usr/bin/env python3
"""
Python Demo Script
A simple demonstration of Python features and functionality.
"""

import random
import datetime
from typing import List, Dict


class Calculator:
    """A simple calculator class to demonstrate OOP in Python."""

    def __init__(self):
        self.history = []

    def add(self, a: float, b: float) -> float:
        """Add two numbers."""
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result

    def multiply(self, a: float, b: float) -> float:
        """Multiply two numbers."""
        result = a * b
        self.history.append(f"{a} * {b} = {result}")
        return result

    def get_history(self) -> List[str]:
        """Get calculation history."""
        return self.history


def generate_random_data(size: int = 10) -> List[int]:
    """Generate a list of random numbers."""
    return [random.randint(1, 100) for _ in range(size)]


def analyze_data(data: List[int]) -> Dict[str, float]:
    """Analyze a list of numbers and return statistics."""
    if not data:
        return {}

    return {
        'count': len(data),
        'sum': sum(data),
        'average': sum(data) / len(data),
        'min': min(data),
        'max': max(data)
    }


def fibonacci(n: int) -> List[int]:
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    if n == 1:
        return [0]
    if n == 2:
        return [0, 1]

    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])

    return fib


def demo_calculator():
    """Demonstrate calculator functionality."""
    print("📊 Calculator Demo:")
    calc = Calculator()
    result1 = calc.add(15, 25)
    result2 = calc.multiply(7, 8)
    print(f"15 + 25 = {result1}")
    print(f"7 * 8 = {result2}")
    print(f"History: {calc.get_history()}")
    print()


def demo_data_analysis():
    """Demonstrate data analysis functionality."""
    print("📈 Data Analysis Demo:")
    random_numbers = generate_random_data(15)
    print(f"Random data: {random_numbers}")

    stats = analyze_data(random_numbers)
    for key, value in stats.items():
        print(f"{key.capitalize()}: {value}")
    print()


def demo_fibonacci():
    """Demonstrate Fibonacci sequence generation."""
    print("🔢 Fibonacci Sequence Demo:")
    fib_sequence = fibonacci(10)
    print(f"First 10 Fibonacci numbers: {fib_sequence}")
    print()


def demo_list_comprehension():
    """Demonstrate list comprehension functionality."""
    print("🔄 List Comprehension Demo:")
    squares = [x**2 for x in range(1, 11)]
    even_squares = [x for x in squares if x % 2 == 0]
    print(f"Squares of 1-10: {squares}")
    print(f"Even squares: {even_squares}")
    print()


def demo_dictionary():
    """Demonstrate dictionary operations."""
    print("📚 Dictionary Demo:")
    student_grades = {
        'Alice': 95,
        'Bob': 87,
        'Charlie': 92,
        'Diana': 98
    }

    print("Student grades:")
    for name, grade in student_grades.items():
        status = "Excellent" if grade >= 90 else "Good" if grade >= 80 else "Needs Improvement"
        print(f"  {name}: {grade} ({status})")

    average_grade = sum(student_grades.values()) / len(student_grades)
    print(f"Class average: {average_grade:.1f}")
    print()


def main():
    """Main function demonstrating various Python features."""
    print("🐍 Python Demo Script")
    print("=" * 50)

    # Current timestamp
    now = datetime.datetime.now()
    print(f"Current time: {now.strftime('%Y-%m-%d %H:%M:%S')}")
    print()

    # Run all demos
    demo_calculator()
    demo_data_analysis()
    demo_fibonacci()
    demo_list_comprehension()
    demo_dictionary()

    print("✅ Demo completed successfully!")


if __name__ == "__main__":
    main()