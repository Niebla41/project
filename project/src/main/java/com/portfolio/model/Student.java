package com.portfolio.model;

import java.util.*;

public class Student {
    private List<Course> courses;
    private Map<String, List<Course>> categorizedCourses;
    
    public Student() {
        this.courses = new ArrayList<>();
        this.categorizedCourses = new HashMap<>();
    }

    public void addCourse(String name, String category, double grade) {
        Course course = new Course(name, category, grade);
        courses.add(course);
    }

    public void categorizeCourses() {
        categorizedCourses.clear();
        for (Course course : courses) {
            categorizedCourses
                .computeIfAbsent(course.getCategory(), k -> new ArrayList<>())
                .add(course);
        }
    }

    public String determineLevel(double average) {
        if (average >= 95) return "Excelente";
        if (average >= 85) return "Hábil";
        if (average >= 75) return "Conoce";
        return "Necesita mejorar";
    }

    public Map<String, Double> calculateCategoryAverages() {
        Map<String, Double> averages = new HashMap<>();
        
        for (Map.Entry<String, List<Course>> entry : categorizedCourses.entrySet()) {
            double sum = entry.getValue().stream()
                .mapToDouble(Course::getGrade)
                .sum();
            averages.put(entry.getKey(), sum / entry.getValue().size());
        }
        
        return averages;
    }

    public double calculateOverallAverage() {
        return courses.stream()
            .mapToDouble(Course::getGrade)
            .average()
            .orElse(0.0);
    }
}