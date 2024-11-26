import 'bootstrap';
import Chart from 'chart.js/auto';
import { AcademicRecord } from './modules/AcademicRecord.js';
import { courses } from './data/courses.js';

const academicRecord = new AcademicRecord(courses);
academicRecord.initialize();

// Initialize Charts
const ctx = document.getElementById('competencyChart').getContext('2d');
new Chart(ctx, {
    type: 'radar',
    data: {
        labels: Array.from(academicRecord.getCategoryAverages().keys()),
        datasets: [{
            label: 'Nivel de Competencia',
            data: Array.from(academicRecord.getCategoryAverages().values()),
            backgroundColor: 'rgba(33, 150, 243, 0.2)',
            borderColor: '#2196F3',
            pointBackgroundColor: '#2196F3'
        }]
    },
    options: {
        scales: {
            r: {
                min: 0,
                max: 100,
                beginAtZero: true
            }
        }
    }
});