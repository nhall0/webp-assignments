<script setup lang="ts">
import { onMounted, ref, watch} from 'vue';
import { getMonthsDatesFromCron, type Goal } from '@/model/goals';
import { getWorkouts } from '@/model/workouts';

interface CalendarDay {
    date: Date;
    label: string;
    goals: string[];
}

const props = defineProps({
    userGoals: {
        type: Array as () => Array<Goal>,
        required: true,
    },
});

const currentMonth = ref(new Date());
const calendarDays = ref<CalendarDay[]>([]);

const previousMonth = () => {
    currentMonth.value.setMonth(currentMonth.value.getMonth() - 1);
    calculateCalendarDays();
};

const nextMonth = () => {
    currentMonth.value.setMonth(currentMonth.value.getMonth() + 1);
    calculateCalendarDays();
};

const workouts = ref<Record<string, string>>({});

const fetchWorkouts = async () => {
    await getWorkouts().then((res) => {
        for (const workout of res) {
        workouts.value[workout._id] = workout.name;
    }
    });
};

const calculateCalendarDays = async () => {
    await fetchWorkouts().then(() => {
        const monthDates: Record<string, string[]> = {};

    for (let goal of props.userGoals) {
        const dates = getMonthsDatesFromCron(goal.repetition, currentMonth.value.getMonth());
        for (let date of dates) {
            if (!monthDates[date]) {
                monthDates[date] = [];
            }
            monthDates[date].push(goal.workout);
        }
    }

    const daysInMonth: CalendarDay[] = [];
    const currentYear = currentMonth.value.getFullYear();
    const currentMonthValue = currentMonth.value.getMonth();
    const firstDay = new Date(currentYear, currentMonthValue, 1);
    const lastDay = new Date(currentYear, currentMonthValue + 1, 0);

    for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
        const workoutIds = monthDates[date.toLocaleDateString()] || [];
        const workoutNames = workoutIds.map(id => workouts.value[id]).filter(Boolean);
    

        if (workoutNames.length > 0) {
            daysInMonth.push({
                date: new Date(date),
                label: date.getDate().toString(),
                goals: workoutNames
            });
        }
    }

    calendarDays.value = daysInMonth;
    });
};

onMounted(() => {
    calculateCalendarDays();
});

watch(() => props.userGoals, () => {
    calculateCalendarDays();
});
</script>

<template>
    <div class="calendar">
        <div class="calendar-header">
            <button @click="previousMonth" class="button">Previous</button>
            <h2>{{ currentMonth.toLocaleDateString() }}</h2>
            <button @click="nextMonth" class="button">Next</button>
        </div>
        <div class="calendar-grid">
            <div class="calendar-day" v-for="day in calendarDays" :key="day.label">
                <div class="day-label">{{ day.label }}</div>
                <div class="day-content">
                    <div class="goals">
                        <div v-for="goal in day.goals" :key="goal" class="rounded-box">
                            {{ goal }}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<style scoped>
.rounded-box {
    background-color: #dc3232;
    color: white;
    padding: 5px;
    border-radius: 10px;
    margin: 5px;
}

.green-bg {
    background-color: green;
}

.blue-bg {
    background-color: blue;
}

.calendar {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.calendar-header button {
    border: none;
    cursor: pointer;
    margin: 0 5px;
    background-color: #3273dc;
    color: white;
}

.calendar-header button:hover {
    background-color: #2769c4;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
}

.calendar-day {
    background-color: #f5f5f5;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.day-label {
    font-weight: bold;
    margin-bottom: 5px;
}

.day-content {
    display: flex;
    flex-direction: column;
}

.goals,
.posts {
    margin-top: 5px;
}
</style>
  