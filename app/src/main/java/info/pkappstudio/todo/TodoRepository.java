package info.pkappstudio.todo;

import android.app.Application;

import androidx.lifecycle.LiveData;

import java.util.Calendar;
import java.util.List;

public class TodoRepository {

    private TodoDao todoDao;
    private LiveData<List<Todo>> mList;

    Calendar calendar = Calendar.getInstance();
    long date_ = calendar.get(Calendar.DATE) + calendar.get(Calendar.MONTH) + calendar.get(Calendar.YEAR);

    TodoRepository(Application application){
        TodoRoomDatabase database = TodoRoomDatabase.getDatabase(application);
        todoDao = database.todoDao();
        mList = todoDao.getAllTodo();
    }

    LiveData<List<Todo>> getAllTodo() {
        return mList;
    }

    void insert(Todo todo){
        TodoRoomDatabase.writer.execute(() -> {
            todoDao.insert(todo);
        });
    }
    void update(Todo todo){
        TodoRoomDatabase.writer.execute(() -> {
            todoDao.update(todo);
        });
    }
    void delete(Todo todo){
        TodoRoomDatabase.writer.execute(() -> {
            todoDao.delete(todo);
        });
    }

}
