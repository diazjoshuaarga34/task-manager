<?php

namespace App\Controller;

use App\Entity\Task;
use App\Form\TaskType;
use Doctrine\ORM\EntityManagerInterface;

use App\Repository\TaskRepository;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class TaskController extends AbstractController
{
    #[Route('/tasks/table', name: 'task_table')]
    public function table(TaskRepository $taskRepository): Response
    {
        return $this->render('task/table.html.twig', [
            'data_table' => $taskRepository->findAll(),
        ]);
    }

    #[Route('/tasks/create', name: 'task_form')]
    public function form(Request $request, EntityManagerInterface $em, TaskRepository $taskRepository): Response
    {
        $task = new Task();

        $form = $this->createForm(TaskType::class, $task);

        $form->handleRequest($request);

        if ($form->isSubmitted()) {

            $title = $task->getTitle();
            //
            if (preg_match('/\d/', $title)) {
                $this->addFlash('failed_save', 'Numbers are not allowed in title');

                return $this->redirectToRoute('task_form');
            }

            if ($form->isValid()) {
                try {
                    $em->persist($task);
                    $em->flush();

                    $this->addFlash('success_save', 'Task saved successfully!');

                    return $this->redirectToRoute('task_form');
                } catch (\Exception $e) {
                    $this->addFlash('failed_save', 'Something Went Wrong');

                    return $this->redirectToRoute('task_form');
                }
            }
        }

        return $this->render('task/create.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/tasks/delete/{id}', name: 'task_delete', methods: ['DELETE'])]
    public function delete(Task $task, EntityManagerInterface $em): Response
    {
        $em->remove($task);
        $em->flush();

        return $this->json([
            'success_delete' => true
        ]);
    }

    #[Route('/tasks/update/{id}', name: 'task_update', methods: ['POST'])]
    public function update(Request $request, Task $task, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);

        $task->setTitle($data['title']);
        $task->setStatus($data['status']);
        $task->setDescription($data['description']);

        $em->flush();

        return $this->json([
            'success_edit' => true,
            'task' => [
                'id' => $task->getId(),
                'title' => $task->getTitle(),
                'description' => $task->getDescription(),
                'status' => $task->getStatus(),
            ]
        ]);
    }
}
