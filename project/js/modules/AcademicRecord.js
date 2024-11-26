export class AcademicRecord {
    constructor(courses) {
        this.courses = courses;
        this.categoryAverages = new Map();
    }

    initialize() {
        this.calculateAverages();
        this.displayCourses();
        this.updateOverallStats();
    }

    determineLevel(grade) {
        if (grade >= 95) return { text: 'Excelente', class: 'bg-success' };
        if (grade >= 85) return { text: 'Hábil', class: 'bg-primary' };
        if (grade >= 75) return { text: 'Conoce', class: 'bg-info' };
        return { text: 'Necesita Mejorar', class: 'bg-warning' };
    }

    calculateAverages() {
        const categories = new Map();
        
        this.courses.forEach(course => {
            if (!categories.has(course.category)) {
                categories.set(course.category, []);
            }
            categories.get(course.category).push(course.grade);
        });

        categories.forEach((grades, category) => {
            const average = grades.reduce((a, b) => a + b) / grades.length;
            this.categoryAverages.set(category, average);
        });
    }

    getCategoryAverages() {
        return this.categoryAverages;
    }

    getOverallAverage() {
        const grades = this.courses.map(course => course.grade);
        return grades.reduce((a, b) => a + b) / grades.length;
    }

    displayCourses() {
        const tableBody = document.getElementById('courseTable');
        tableBody.innerHTML = this.courses.map(course => {
            const level = this.determineLevel(course.grade);
            return `
                <tr>
                    <td>${course.name}</td>
                    <td>${course.category}</td>
                    <td>${course.grade}</td>
                    <td><span class="badge ${level.class}">${level.text}</span></td>
                </tr>
            `;
        }).join('');
    }

    updateOverallStats() {
        const average = this.getOverallAverage();
        const level = this.determineLevel(average);
        
        document.getElementById('overallAverage').textContent = average.toFixed(1);
        document.getElementById('overallLevel').textContent = level.text;
        document.getElementById('overallLevel').className = `display-4 ${level.class} text-white`;
    }
}