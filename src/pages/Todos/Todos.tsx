import cls from "./Todos.module.css";
import { IconNoProjects, IconSearch, IconSort, IconEdit, IconDelete } from "../../components/icons";
import btn from "../../assets/buttons.module.css";

export const Todos = () => {
  return (
    <section className={cls.todos}>
      <div className="container">
        <div className={cls.todosContent}>
          <div className={cls.todosTop}>
            <div className={cls.todosSearch}>
              <IconSearch className={cls.todoSearchIcon} />
              <input className={cls.todosSearchInput} type={"search"} placeholder="Search some todo..." />
            </div>
          </div>
          <div className={cls.todosBottom}>
            <div className={cls.todosTitleWrapper}>
              <h1 className={cls.todosTitle}>Todos</h1>
              <div className={`${cls.todosListSort} ${cls.todosListSortDesktopHidden}`}>
                <button className={cls.todosListSortArrow} type={"button"}>
                  <IconSort />
                </button>
                <button className={cls.todosListSortText} type={"button"}>
                  Sort by
                </button>
              </div>
            </div>
            <div className={cls.todosAdd}>
              <input className={cls.todosAddInput} type="text" placeholder={"Add a todo"} />
              <button disabled={true} className={`${cls.todosAddButton} ${btn.btn}`} type={"button"}>
                Add
              </button>
            </div>
            <div className={cls.todosList}>
              <div className={cls.todosListTop}>
                <div className={cls.todosListStatus}>
                  <button className={`${cls.todosListStatusButton} ${cls.todosListStatusButtonActive}`} type={"button"}>
                    All
                  </button>
                  <button className={cls.todosListStatusButton} type={"button"}>
                    Active
                  </button>
                  <button className={cls.todosListStatusButton} type={"button"}>
                    Completed
                  </button>
                </div>
                <div className={`${cls.todosListSort} ${cls.todosListSortMobileHidden}`}>
                  <button className={cls.todosListSortArrow} type={"button"}>
                    <IconSort />
                  </button>
                  <button className={cls.todosListSortText} type={"button"}>
                    Sort by
                  </button>
                </div>
              </div>
              <div className={cls.todosListBottom}>
                {false ? (
                  <div className={cls.todosNoProjects}>
                    <IconNoProjects />
                    <span>No todos yet</span>
                  </div>
                ) : (
                  <div className={cls.todosItems}>
                    <div className={cls.todosItem}>
                      <div className={cls.todosItemCheckbox}>
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className={cls.todosItemContent}>
                        <p className={cls.todosItemContentText}>Project name</p>
                        <span className={cls.todosItemContentDate}>January 3, 2022, Monday</span>
                      </div>
                      <div className={cls.todosItemButtons}>
                        <button type="button" className={cls.todosItemEdit}>
                          <IconEdit />
                        </button>
                        <button type="button" className="cls.todosItemDelet">
                          <IconDelete />
                        </button>
                      </div>
                    </div>
                    <div className={cls.todosItem}>
                      <div className={cls.todosItemCheckbox}>
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className={cls.todosItemContent}>
                        <p className={cls.todosItemContentText}>Project name</p>
                        <span className={cls.todosItemContentDate}>January 3, 2022, Monday</span>
                      </div>
                      <div className={cls.todosItemButtons}>
                        <button type="button" className={cls.todosItemEdit}>
                          <IconEdit />
                        </button>
                        <button type="button" className="cls.todosItemDelet">
                          <IconDelete />
                        </button>
                      </div>
                    </div>
                    <div className={cls.todosItem}>
                      <div className={cls.todosItemCheckbox}>
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className={cls.todosItemContent}>
                        <p className={cls.todosItemContentText}>Project name</p>
                        <span className={cls.todosItemContentDate}>January 3, 2022, Monday</span>
                      </div>
                      <div className={cls.todosItemButtons}>
                        <button type="button" className={cls.todosItemEdit}>
                          <IconEdit />
                        </button>
                        <button type="button" className="cls.todosItemDelet">
                          <IconDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
