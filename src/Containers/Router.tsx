import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CourseList } from "../Components/Courses";
import { ExerciseComponent, ExerciseList } from "../Components/Exercises";
import { WorksheetComponent } from "../Components/Export";
import Home from "./Home";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="courses" element={<CourseList />} />
                    <Route path="exercises">
                        <Route path="list" element={<ExerciseList />} />
                        <Route path="run" element={<ExerciseComponent />} />
                        <Route path="past/:exerciseId" element={<ExerciseComponent />} />
                        <Route path="export">
                            <Route path="worksheet/:exerciseId" element={<WorksheetComponent />} />
                        </Route>
                    </Route>
                </Route>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}