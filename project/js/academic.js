class Course {
    constructor(name, category, grade) {
        this.name = name;
        this.category = category;
        this.grade = grade;
    }
}

class AcademicPortfolio {
    constructor() {
        this.courses = [];
        this.categorizedCourses = new Map();
    }

    addCourse(name, category, grade) {
        this.courses.push(new Course(name, category, grade));
    }

    categorizeCourses() {
        this.categorizedCourses.clear();
        this.courses.forEach(course => {
            if (!this.categorizedCourses.has(course.category)) {
                this.categorizedCourses.set(course.category, []);
            }
            this.categorizedCourses.get(course.category).push(course);
        });
    }

    determineLevel(average) {
        if (average >= 95) return "Excelente";
        if (average >= 85) return "Hábil";
        if (average >= 75) return "Conoce";
        return "Necesita mejorar";
    }

    getLevelClass(level) {
        switch(level) {
            case "Excelente": return "bg-success";
            case "Hábil": return "bg-primary";
            case "Conoce": return "bg-info";
            default: return "bg-warning";
        }
    }

    calculateCategoryAverages() {
        const averages = new Map();
        this.categorizedCourses.forEach((courses, category) => {
            const sum = courses.reduce((acc, course) => acc + course.grade, 0);
            averages.set(category, sum / courses.length);
        });
        return averages;
    }

    calculateOverallAverage() {
        const sum = this.courses.reduce((acc, course) => acc + course.grade, 0);
        return sum / this.courses.length;
    }

    displayResults() {
        this.categorizeCourses();
        const categoryAverages = this.calculateCategoryAverages();
        const overallAverage = this.calculateOverallAverage();

        // Display category averages with progress bars
        const categoryAveragesDiv = document.getElementById('categoryAverages');
        categoryAveragesDiv.innerHTML = '';
        categoryAverages.forEach((average, category) => {
            const level = this.determineLevel(average);
            const progressBar = `
                <div class="mb-3">
                    <div class="d-flex justify-content-between">
                        <span>${category}</span>
                        <span>${average.toFixed(2)}</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar ${this.getLevelClass(level)}" 
                             role="progressbar" 
                             style="width: ${average}%" 
                             aria-valuenow="${average}" 
                             aria-valuemin="0" 
                             aria-valuemax="100">
                            ${level}
                        </div>
                    </div>
                </div>`;
            categoryAveragesDiv.innerHTML += progressBar;
        });

        // Display overall average
        document.getElementById('overallAverage').textContent = 
            `${overallAverage.toFixed(2)}`;
        const overallLevel = this.determineLevel(overallAverage);
        document.getElementById('overallLevel').textContent = overallLevel;
        document.getElementById('overallLevel').className = 
            `badge ${this.getLevelClass(overallLevel)}`;

        // Display course table
        const courseTable = document.getElementById('courseTable');
        courseTable.innerHTML = '';
        this.courses.forEach(course => {
            const level = this.determineLevel(course.grade);
            const row = `
                <tr>
                    <td>${course.category}</td>
                    <td>${course.name}</td>
                    <td>${course.grade}</td>
                    <td><span class="badge ${this.getLevelClass(level)}">${level}</span></td>
                </tr>`;
            courseTable.innerHTML += row;
        });
    }
}

// Initialize and populate the portfolio
const portfolio = new AcademicPortfolio();

// Add your courses here
portfolio.addCourse("Cálculo Diferencial", "Matemáticas", 87);
portfolio.addCourse("Álgebra Lineal", "Matemáticas", 85);
portfolio.addCourse("Programación Orientada a Objetos", "Programación", 92);
portfolio.addCourse("Estructuras de Datos", "Programación", 88);
portfolio.addCourse("SQL Avanzado", "Base de Datos", 90);
portfolio.addCourse("Redes de Computadoras", "Redes", 86);
portfolio.addCourse("Gestión de Proyectos", "Administración de Proyectos", 93);
portfolio.addCourse("Ingeniería de Software", "Industria", 89);
portfolio.addCourse("Inglés Técnico", "Idiomas", 95);

// Display results
portfolio.displayResults();