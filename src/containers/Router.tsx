import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CourseList } from "../components/Courses";
import { ExerciseComponent, ExerciseList } from "../components/Exercises";
import { WorksheetComponent } from "../components/Export";
import { TopicList } from "../components/Topics";
import About from "../pages/About";
import Welcome from "../pages/Welcome";
import Home from "./Home";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<Welcome />} />
                    <Route path="courses" element={<CourseList />} />
                    <Route path="topics" element={<TopicList />} />
                    <Route path="about" element={<About />} />
                    <Route path="exercises">
                        <Route path="list" element={<ExerciseList />} />
                        <Route path="run" element={<ExerciseComponent />} />
                        <Route path="past/:exerciseId" element={<ExerciseComponent />} />
                        <Route path="export">
                            <Route path="worksheet/:exerciseId" element={<WorksheetComponent />} />
                        </Route>
                    </Route>
                    <Route
                        path="*"
                        element={
                            <Welcome />
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}