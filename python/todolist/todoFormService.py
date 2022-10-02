import tkinter as tk
from datetime import date

class todoFormService:
    def __init__(self, form_frame):
        self.form_input = {}
        self.form_frame = form_frame

    def create(self, form):
        for index, item in enumerate(form):
            form_row = tk.Frame(self.form_frame)
            form_row.pack(side = tk.TOP, anchor=tk.CENTER)
            tk.Label(form_row, text=item['label'], borderwidth=0, relief=tk.RAISED, pady=5, width=10 ).pack(side = tk.LEFT)
            self.form_input[item['label']] = tk.StringVar()
            if(item['type'] == 'selectbox'):
                self.form_input[item['label']].set(item['data'][0]) # initial value
                # module_selectbox_name = 'column' + str(index)
                # command = lambda _item: self.data.binding_event({ 'module': module_selectbox_name, 'id': bodies[0]['text'], 'value': _item })
                optionmenu = tk.OptionMenu(form_row, self.form_input[item['label']], *item['data'])
                optionmenu.config(borderwidth=2, relief="groove", padx=32, pady=4, width = 10)
                optionmenu.pack(side = tk.LEFT)
            else:
                # passw_entry=tk.Entry(root, textvariable = input, show = '*')
                input_entry = tk.Entry(form_row, textvariable = self.form_input[item['label']])
                input_entry.pack(side = tk.LEFT, pady=5)   

    def get_all(self):
        today = date.today()
        result = []
        for item in self.form_input:
            result.append(self.form_input[item].get())
        result.append(today)
        result.append(today)
        return result 