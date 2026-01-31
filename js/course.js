let currentLesson = 1;

// Переключение уроков через сайдбар
document.querySelectorAll('.lesson-item').forEach(item => {
    item.addEventListener('click', function() {
        const lessonNum = this.dataset.lesson;
        showLesson(lessonNum);
    });
});

function showLesson(lessonNum) {
    // Скрыть все уроки
    document.querySelectorAll('.lesson').forEach(lesson => {
        lesson.classList.add('hidden');
    });
    
    // Показать выбранный урок
    const targetLesson = document.getElementById(`lesson-${lessonNum}`);
    if (targetLesson) {
        targetLesson.classList.remove('hidden');
        currentLesson = parseInt(lessonNum);
        
        // Обновить активный пункт в сайдбаре
        document.querySelectorAll('.lesson-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-lesson="${lessonNum}"]`).classList.add('active');
        
        // Прокрутить наверх
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function nextLesson() {
    const nextLessonNum = currentLesson + 1;
    const nextLessonElement = document.getElementById(`lesson-${nextLessonNum}`);
    
    if (nextLessonElement) {
        // Отметить текущий урок как завершенный
        const currentItem = document.querySelector(`[data-lesson="${currentLesson}"]`);
        if (currentItem) {
            currentItem.classList.add('completed');
        }
        
        showLesson(nextLessonNum);
    } else {
        alert('🎉 Поздравляем! Вы завершили все доступные уроки!');
    }
}

function prevLesson() {
    const prevLessonNum = currentLesson - 1;
    if (prevLessonNum >= 1) {
        showLesson(prevLessonNum);
    }
}

function runCode(taskNum) {
    const codeInput = document.getElementById(`code-${taskNum}`);
    const output = document.getElementById(`output-${taskNum}`);
    const code = codeInput.value;
    
    if (!code.trim()) {
        output.textContent = '⚠️ Пожалуйста, напишите код';
        output.style.color = '#ff6b6b';
        return;
    }
    
    // Симуляция выполнения кода
    output.style.color = '#2E86AB';
    output.textContent = '✅ Код выполнен успешно!\n\n';
    
    // Простая симуляция вывода
    if (code.includes('print(') || code.includes('println(') || code.includes('cout') || code.includes('printf(')) {
        output.textContent += '📤 Вывод:\n';
        
        // Извлечение строк для вывода (упрощенная версия)
        const matches = code.match(/["']([^"']+)["']/g);
        if (matches) {
            matches.forEach(match => {
                output.textContent += match.replace(/["']/g, '') + '\n';
            });
        } else {
            output.textContent += 'Привет из вашей программы!\n';
        }
    } else {
        output.textContent += 'Программа выполнена без ошибок.';
    }
    
    // Анимация успеха
    output.style.animation = 'fadeIn 0.5s ease';
}

// Сохранение прогресса в localStorage
function saveProgress() {
    const completed = [];
    document.querySelectorAll('.lesson-item.completed').forEach(item => {
        completed.push(item.dataset.lesson);
    });
    localStorage.setItem('completedLessons', JSON.stringify(completed));
}

// Загрузка прогресса
function loadProgress() {
    const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    completed.forEach(lessonNum => {
        const item = document.querySelector(`[data-lesson="${lessonNum}"]`);
        if (item) {
            item.classList.add('completed');
        }
    });
}

// Загрузить прогресс при загрузке страницы
window.addEventListener('load', loadProgress);

// Сохранять прогресс при переходе к следующему уроку
window.addEventListener('beforeunload', saveProgress);

// Горячие клавиши
document.addEventListener('keydown', (e) => {
    // Ctrl + Enter для запуска кода
    if (e.ctrlKey && e.key === 'Enter') {
        const activeLesson = document.querySelector('.lesson:not(.hidden)');
        if (activeLesson) {
            const lessonId = activeLesson.id.split('-')[1];
            const runButton = activeLesson.querySelector('.run-button');
            if (runButton) {
                runButton.click();
            }
        }
    }
    
    // Стрелки для навигации
    if (e.key === 'ArrowRight' && e.altKey) {
        nextLesson();
    }
    if (e.key === 'ArrowLeft' && e.altKey) {
        prevLesson();
    }
});

console.log('🚀 Codemy Course System загружен');
console.log('💡 Горячие клавиши:');
console.log('   Ctrl + Enter - Запустить код');
console.log('   Alt + → - Следующий урок');
console.log('   Alt + ← - Предыдущий урок');
