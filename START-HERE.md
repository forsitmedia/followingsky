# Adding properties through chat

Open this Following Sky project in Codex and send the property link, folder, ZIP, documents, photos, or the path to a local folder. Write:

> Add this property to Following Sky using our saved property workflow. The materials are in [folder path / attached files].

If the client has sent you a listing link, you can simply write:

> Add this property using our saved workflow: [property link]
>
> Vertical video: [YouTube Short link, if available]
>
> Horizontal video: [YouTube link, if available]

The agent opens the listing, extracts the details, downloads the best accessible property photos, rewrites the description in our style, and prepares the page and listing card. You do not need to screenshot each photo or copy the description first. If the page or particular photos cannot be accessed, the agent will identify what is missing and ask only for those materials.

Your YouTube Shorts and horizontal tours can be supplied as links. State the orientation when you know it; the agent checks the video, uses the appropriate layout, and embeds it from YouTube. A property link alone is enough when there is no video to add.

If you want publication in the same request, add:

> Check the result and push it to GitHub when ready.

You do not need to rewrite long documents or fill in a form. The agent reads the material, extracts the details, organises the images, prepares the listing, and checks how it displays. It will ask about material gaps or conflicting information it cannot resolve from the sources.

For a folder kept inside this project, use:

```text
property-inbox/
  property-name/
    description.docx
    brochure.pdf
    photos/
    video-links.txt
```

Use whatever filenames you already have; this structure is optional. The agent can organise it. Inbox files stay local and are excluded from Git, apart from the inbox README. Selected website assets are copied to their public locations.

For later changes, you can say:

> Update [property name]: the new price is […].

> Mark [property name] as sold.

> Continue preparing the property in property-inbox/[folder name].

Project instructions are stored in [AGENTS.md](AGENTS.md), the detailed procedure in [PROPERTY-WORKFLOW.md](PROPERTY-WORKFLOW.md), and current content decisions in [CONTENT-GUIDE.md](CONTENT-GUIDE.md). Codex reads project instructions when starting work in this repository, as described in the [official OpenAI documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

Open this same project for a new chat so those instructions and local files are available. The saved files carry the working context; a new chat does not need the full history of this conversation. A new checkout or another computer will also need the original intake materials, because the inbox is not uploaded to GitHub.
