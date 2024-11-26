package com.portfolio;

import com.portfolio.model.Student;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Student student = new Student();

        // Adding sample courses
        student.addCourse("Cálculo Diferencial", "Matemáticas", 87);
        student.addCourse("Álgebra Lineal", "Matemáticas", 85);
        student.addCourse("Programación Orientada a Objetos", "Programación", 92);
        student.addCourse("Estructuras de Datos", "Programación", 88);
        student.addCourse("SQL Avanzado", "Base de Datos", 90);
        student.addCourse("Redes de Computadoras", "Redes", 86);
        student.addCourse("Gestión de Proyectos", "Administración de Proyectos", 93);
        student.addCourse("Ingeniería de Software", "Industria", 89);
        student.addCourse("Inglés Técnico", "Idiomas", 95);

        // Categorize courses
        student.categorizeCourses();

        // Calculate and display averages
        Map<String, Double> categoryAverages = student.calculateCategoryAverages();
        double overallAverage = student.calculateOverallAverage();

        System.out.println("=== Análisis Académico ===\n");
        
        System.out.println("Promedios por Categoría:");
        categoryAverages.forEach((category, average) -> 
            System.out.printf("%s: %.2f - Nivel: %s%n", 
                category, average, student.determineLevel(average)));

        System.out.printf("%nPromedio General: %.2f%n", overallAverage);
        System.out.printf("Nivel General: %s%n", student.determineLevel(overallAverage));
    }
}