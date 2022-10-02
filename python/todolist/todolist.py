import tkinter as tk
from tableService import tableService
from todolistService import todolistService
from todoFormService import todoFormService

# trigger event from tableService
class bindEvent:
    __ids = []

    def binding_event(self, item):
        match item['module']:
            case 'column0':
                self.__ids.append(item['id']) if item['value'] == 1 else self.__ids.remove(item['id'])
            case 'column3':
                display_status.set('Status: [module] -> ' + item['module'] + ', [id] -> ' + str(item['id']) + ', [value] -> ' + item['value'])

    def get_ids(self):
        return self.__ids

# load tkinter
root = tk.Tk(className='Todolist')
# root.option_add('*Font', 'ArundinaSansMono 10')

todo = todolistService('todolist/todo.db')

# Display Frame
display_frame = tk.Frame(root)
display_frame.pack(side= tk.TOP, fill = tk.X)

tk.Button(display_frame, text='show selections', background = '#89cff0', command=lambda: display_ids.set('Ids: ' + str(bind_event.get_ids()))).pack(side = tk.TOP, pady=5)
display_ids = tk.StringVar(display_frame, value='Ids: []')
label = tk.Label(display_frame, textvariable=display_ids, borderwidth=0, relief=tk.RAISED, pady=5 ).pack(side = tk.TOP, pady=(0, 5))
tk.Button(display_frame,text='EventListener', background = '#ffff66').pack(side = tk.TOP, pady=(0, 5))
display_status = tk.StringVar(display_frame, value='Status: ')
label = tk.Label(display_frame, textvariable=display_status, borderwidth=0, relief=tk.RAISED, pady=5 ).pack(side = tk.TOP, pady=(0, 5))

# Form Frame
form_frame = tk.Frame(root)
form_frame.pack(anchor = tk.CENTER)

form = todoFormService(form_frame)
form.create((
    { 'label': 'Title', 'type': 'text' },
    { 'label': 'Status', 'type': 'selectbox', 'data': ('pending', 'complete') }
))
tk.Button(form_frame,text='Submit', background = '#f56c42', width=18, command=lambda: todo.create_todo(form.get_all())).pack(side = tk.TOP, anchor=tk.NE,pady=5)

# Table Frame
table_frame = tk.Frame(root)
table_frame.pack(anchor = tk.CENTER)


# Create Table
bind_event = bindEvent()
table = tableService(table_frame, bind_event)
table.set_column(widths=(5, 10, 30, 10, 10, 10))
table.set_header((
    { 'text': '#' },
    { 'text': 'ID' },
    { 'text': 'Title' },
    { 'text': 'Status' },
    { 'text': 'Created_at' },
    { 'text': 'Updated_at' }
))

# for widgets in table_frame.winfo_children():
#     print(widgets)
    # widgets.destroy()

# todo.generate_row(100) # auto generate row
data_list = todo.get_todo()
# todo.conn.close() # close connection with this database.
for item in data_list:
    body_array = [{ 'text': item[0], 'type': 'checkbox'}]
    for index, text in enumerate(item):
        if(index == 2): # status field
            body_array.append({ 'text': text, 'type': 'selectbox', 'data': ('pending', 'complete') })
        else:
            body_array.append({ 'text': text, 'type': 'text' })
    table.set_body(body_array)

root.mainloop()