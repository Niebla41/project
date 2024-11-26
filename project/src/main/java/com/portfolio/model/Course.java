package com.portfolio.model;

public class Course {
    private String name;
    private String category;
    private double grade;

    public Course(String name, String category, double grade) {
        this.name = name;
        this.category = category;
        this.grade = grade;
    }

    public String getName() { return name; }
    public String getCategory() { return category; }
    public double getGrade() { return grade; }
}