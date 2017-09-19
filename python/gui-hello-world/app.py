import wx

app = wx.App()

class Frame(wx.Frame):
    def __init__(self):
        super().__init__(None, title="Python GUI")
        
        self.button = wx.Button(self, -1, "Say Hello")
        self.button.Bind(wx.EVT_BUTTON, self.OnClick)

    def OnClick(self, event):
        dialog = wx.MessageDialog(self, 'Hello', 'Greetings', wx.OK)
        dialog.ShowModal()
        dialog.Destroy()


Frame().Show()
app.MainLoop()
